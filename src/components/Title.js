import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
  text-align: center;
`;

const Title = ({ text }) => {
  return <TitleWrapper>{text}</TitleWrapper>;
};

export default Title;
