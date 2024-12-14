import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Right = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
`;

const MyList = ({ myList, onAddToMyList, onDelete }) => {
  return (
    <Layout>
      <Right>
        <h2>내 리스트</h2>
        <ul>
          {myList.length === 0 ? (
            <p>관심 도서 목록이 비어 있습니다.</p>
          ) : (
            myList.map((item) => (
              <li key={item.id}>
                {item.title}
                <button onClick={() => onDelete(item.id)}>삭제</button>
              </li>
            ))
          )}
        </ul>
      </Right>
    </Layout>
  );
};

export default MyList;
