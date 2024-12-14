import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Title = ({ text }) => <Heading>{text}</Heading>;

export default Title;
