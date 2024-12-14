import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
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

const Home = ({ myList, data, error, requestCount }) => {
  // 7개의 데이터만 표시
  const displayedData = data.slice(0, 7);

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        <Title text="마음의 양식에 오신 것을 환영합니다!" />
        <p>문학을 통해 새로운 세상을 탐험해 보세요. 감동적인 이야기가 기다리고 있습니다.</p>
        <h2>내 리스트</h2>
        <ul>
          {myList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        
        {/* 데이터 테이블 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <h2>조회 횟수: {requestCount}회</h2>
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  th, td {
    border: 1px solid #dee2e6;
    padding: 15px;
    text-align: center;
  }

  th {
    background-color: #5c7cfa;
    color: white;
    font-weight: bold;
  }

  tbody tr:hover {  
    background-color: #f1f3f5;
    transition: background-color 0.3s;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
`;

export default Home;
