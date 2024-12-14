import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({ onClick, children }) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

export default Button;
