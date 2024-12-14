import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

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

const PageLayout = ({ children }) => {
  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>{children}</Right>
    </Layout>
  );
};

export default PageLayout;
