import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 3px;
  &:hover {
    background-color: #e6e6fa;
  }
`;

const Sidebar = () => {
  return (
    <Nav>
      <NavLink to="/">홈</NavLink>
      <NavLink to="/explore">탐색</NavLink>
      <NavLink to="/mylist">내 리스트</NavLink>
    </Nav>
  );
};

export default Sidebar;
