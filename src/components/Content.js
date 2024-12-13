import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #fdf5e6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.span`
  font-size: 14px;
  color: #666;
`;

const Content = ({ items = [] }) => {
  if (items.length === 0) {
    return <p>데이터가 없습니다. 검색어를 입력해보세요!</p>;
  }

  return (
    <ContentWrapper>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </ListItem>
        ))}
      </List>
    </ContentWrapper>
  );
};

export default Content;
