import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0); // 조회 카운터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const initialLoad = useRef(true); // 초기 로딩 상태 관리

  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const [numOfRows, setNumOfRows] = useState(3); // 출력 갯수
  const [pageNo, setPageNo] = useState(1); // 페이지 번호
  const startIndex = (pageNo - 1) * numOfRows;
  const endIndex = startIndex + numOfRows;
  const displayedData = data.slice(startIndex, endIndex);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://api.kcisa.kr/openapi/API_CCA_146/request?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}`
        );

        const items = response?.data?.response?.body?.items;
        setData(items?.item || []);
        // 초기 로딩이 아닐 때만 카운트 증가
        if (!initialLoad.current) {
          setRequestCount((prevCount) => prevCount + 1);
        }
        initialLoad.current = false;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [numOfRows, pageNo, serviceKey]);

  const handleNumOfRowsChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) setNumOfRows(value);
  };

  const handlePageNoChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) setPageNo(value);
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

        {isLoading ? (
          <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
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
              {data.length > 0 ? (
                data.map((item, index) => (
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
        )}
      </Right>
    </Layout>
  );
};

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

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    color: #ffa502;
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
    font-size: 16px;
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
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  th, td {
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

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
`;

export default Home;
