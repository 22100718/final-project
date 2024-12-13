import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarWrapper = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled(Link)`
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-size: 18px;
  &:hover {
    color: #007bff;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <NavItem to="/">홈</NavItem>
      <NavItem to="/explore">탐색</NavItem>
      <NavItem to="/mylist">내 리스트</NavItem>
    </SidebarWrapper>
  );
};

export default Sidebar;
