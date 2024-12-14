// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default SearchBar;
