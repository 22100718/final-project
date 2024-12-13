import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import Title from "../components/Title";

const Layout = styled.div`
  display: flex;
  height: 100vh; /* 화면 전체 높이를 사용 */
`;

const Left = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향 정렬 */
  background-color: #f8f9fa; /* 배경색 설정 */
  padding: 20px; /* 적당한 여백 추가 */
`;

const Right = styled.div`
  flex: 1; /* 가변 영역 */
  display: flex;
  flex-direction: column; /* 내용도 세로 정렬 가능 */
  background-color: #ffe4e1;
`;

const Content = styled.div`
  flex: 1; /* 컨텐츠 영역을 확장 */
  padding: 20px; /* 내용에 여백 추가 */
`;

function Home() {
  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        <Content>
          <Title text="마음의 양식" />
          <p>한국 문학의 아름다움을 세계와 공유하세요!</p>
        </Content>
      </Right>
    </Layout>
  );
}

export default Home;
