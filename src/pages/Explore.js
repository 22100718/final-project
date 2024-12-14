import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

const MOCK_API_URL = "https://672f3fc9229a881691f25065.mockapi.io"; // MockAPI 주소

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Left = styled.div`
  width: 200px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Right = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
`;

const Home = ({ data, error }) => {
  const [filterCategory, setFilterCategory] = useState("title"); // 드롭다운 필터
  const [filterKeyword, setFilterKeyword] = useState(""); // 검색 키워드
  const [myList, setMyList] = useState([]); // 내 리스트 상태 관리
  const [loading, setLoading] = useState(false);

  // 필터링된 데이터
  const filteredData = data.filter((item) => {
    const valueToFilter = item[filterCategory]?.toLowerCase() || "";
    return valueToFilter.includes(filterKeyword.toLowerCase());
  });

  // MockAPI를 통해 항목 추가
  const handleAddToMyList = async (item) => {
    try {
      setLoading(true);
      const response = await axios.post(`${MOCK_API_URL}/users`, item);
      setMyList((prevList) => [...prevList, response.data]); // 내 리스트 업데이트
      alert("리스트에 추가되었습니다.");
    } catch (error) {
      console.error("리스트에 추가 실패:", error.response || error.message);
      alert("추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        {/* 검색창 */}
        <SearchBar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterKeyword={filterKeyword}
          setFilterKeyword={setFilterKeyword}
        />

        {/* 데이터 테이블 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading}
        <Table>
          <thead>
            <tr>
              <th>주된 책임을 진 개체</th>
              <th>발행기관</th>
              <th>소속(DB)</th>
              <th>제목</th>
              <th>주제 카테고리</th>
              <th>등록 날짜</th>
              <th>URL</th>
              <th>추가</th> {/* 새로운 열 추가 */}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item?.creator || "N/A"}</td>
                  <td>{item?.publisher || "N/A"}</td>
                  <td>{item?.collectionDb || "N/A"}</td>
                  <td>{item?.title || "N/A"}</td>
                  <td>{item?.subjectCategory || "N/A"}</td>
                  <td>{item?.regDate || "N/A"}</td>
                  <td>
                    {item?.url ? (
                      <a href={item?.url} target="_blank" rel="noopener noreferrer">
                        링크
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <AddButton onClick={() => handleAddToMyList(item)}>
                      추가
                    </AddButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 내 리스트 보기 */}
        <MyListContainer>
          <h2>내 리스트</h2>
          <ul>
            {myList.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </MyListContainer>
      </Right>
    </Layout>
  );
};

/* 검색창 컴포넌트 */
const SearchBar = ({ filterCategory, setFilterCategory, filterKeyword, setFilterKeyword }) => {
  return (
    <SearchContainer>
      <SearchBox>
        {/* 드롭다운 메뉴 */}
        <Dropdown
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="publisher">발행기관</option>
          <option value="regDate">등록 날짜</option>
        </Dropdown>

        {/* 검색 입력창 */}
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />

        {/* 검색 버튼 */}
        <SearchButton>
          <SearchIcon>🔍</SearchIcon>
        </SearchButton>
      </SearchBox>
    </SearchContainer>
  );
};

/* styled-component */
const AddButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #ffa502;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e69502;
  }
`;

const MyListContainer = styled.div`
  margin-top: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
    }

    li:last-child {
      border-bottom: none;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 30px;
  background-color: #fff;
`;

const Dropdown = styled.select`
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0 10px;
  background-color: transparent;
  color: #333;
  appearance: none;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0 10px;
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 10px;
`;

const SearchIcon = styled.span`
  font-size: 16px;
  color: #555;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  th,
  td {
    border: 1px solid #f3e5ab;
    padding: 15px;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #ffeaa7;
    color: #333;
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: #fffbea;
  }

  tbody tr:hover {
    background-color: #ffedcc;
    transition: background-color 0.3s ease;
  }

  a {
    color: #ffa502;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
`;

export default Home;
