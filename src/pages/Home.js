import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

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

const Home = ({ myList, data, error }) => {
  const [requestCount, setRequestCount] = useState(0); // 조회 횟수 초기값 0
  const [pageNo, setPageNo] = useState(1); // 페이지 수
  const [numOfRows, setNumOfRows] = useState(7); // 데이터 수

  const startIndex = (pageNo - 1) * numOfRows;
  const endIndex = startIndex + numOfRows;
  const displayedData = data.slice(startIndex, endIndex);

  const handlePageNoChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setPageNo(value);
    setRequestCount((prev) => prev + 1); // 조회 횟수 증가
  };

  const handleNumOfRowsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setNumOfRows(value);
    setRequestCount((prev) => prev + 1); // 조회 횟수 증가
  };

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        {/* 타이틀 가로 기준 가운데 정렬 */}
        <StyledTitleContainer>
          <StyledTitle>마음의 양식에 오신 것을 환영합니다!</StyledTitle>
        </StyledTitleContainer>
        <StyledSubTitleContainer>
          <p>문학을 통해 새로운 세상을 탐험해 보세요. 감동적인 이야기가 기다리고 있습니다.</p>
        </StyledSubTitleContainer>

        <Controls>
          <RequestCount>조회 횟수: {requestCount}회</RequestCount>
          <InputGroup>
            <label>페이지 수</label>
            <StyledInput
              type="number"
              value={pageNo}
              onChange={handlePageNoChange}
              min="1"
            />
          </InputGroup>
          <InputGroup>
            <label>데이터 수</label>
            <StyledInput
              type="number"
              value={numOfRows}
              onChange={handleNumOfRowsChange}
              min="1"
            />
          </InputGroup>
        </Controls>

        {error && <ErrorMessage>{error}</ErrorMessage>}
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
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Right>
    </Layout>
  );
};

/* 스타일 정의 */

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 기준 가운데 정렬 */
  margin-bottom: 10px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem; /* 폰트 크기 증가 */
  font-weight: bold;
  color: #333;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.05); /* 제목 커지는 애니메이션 */
    color: #ffa502; /* 호버 시 색상 변경 */
  }
`;

const StyledSubTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 16px; /* 폰트 크기 증가 */
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #ffa502;
    box-shadow: 0 0 5px rgba(255, 165, 2, 0.8);
  }
`;

const RequestCount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 10px; /* 테이블 둥근 모서리 */
  overflow: hidden; /* 둥근 모서리 유지 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  th,
  td {
    border: 1px solid #f3e5ab; /* 테두리 색 변경 */
    padding: 15px;
    text-align: center;
    vertical-align: middle;
  }

  th {
    background-color: #ffeaa7; /* 헤더 색상 변경 */
    color: #333;
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: #fffbea;
  }

  tbody tr:hover {
    background-color: #ffedcc; /* 호버 시 색상 */
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
