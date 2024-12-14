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

const Home = ({ myList }) => {
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
      </Right>
    </Layout>
  );
};

export default Home;
