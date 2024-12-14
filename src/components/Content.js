import React from "react";
import { Link } from "react-router-dom";

const Content = ({ items }) => {
  // items가 배열인지, 빈 배열인지 확인
  if (!Array.isArray(items) || items.length === 0) {
    return <p>리스트가 비어 있습니다.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "left",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <strong>작성자:</strong> {item.author}
          </p>
          <p>
            <strong>작성일:</strong> {item.date}
          </p>
          <Link to={`/detail/${item.id}`} style={{ textDecoration: "none", color: "blue" }}>
            자세히 보기
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Content;
