import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

const Layout = styled.div`
  display: flex;
`;

function MyList() {
  const [list, setList] = useState([]);

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <Layout>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Content items={list} onDelete={handleDelete} editable />
      </div>
    </Layout>
  );
}

export default MyList;
