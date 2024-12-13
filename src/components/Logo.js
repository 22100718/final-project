import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: #4b0082;
`;

const Logo = () => {
  return <LogoWrapper>📚 마음의 양식</LogoWrapper>;
};

export default Logo;
