import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";

const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  background-color: #e6e6fa;
  height: calc(100vh - 80px);
`;

const Detail = () => {
  return (
    <Layout>
      <Sidebar />
      <Content>
        <Title text="Detail Page" />
        <p>Detail Content Goes Here</p>
      </Content>
    </Layout>
  );
};

export default Detail;
