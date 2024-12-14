import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList"; // MyList 컴포넌트

const App = () => {
  const [myList, setMyList] = useState([]);

  const handleAddToMyList = (book) => {
    // 이미 추가된 책이 있으면 추가하지 않도록
    if (myList.some((item) => item.id === book.id)) {
      alert("이미 내 리스트에 추가된 책입니다.");
      return;
    }
    setMyList((prevList) => [...prevList, book]);
  };

  const handleDeleteBook = (id) => {
    setMyList((prevList) => prevList.filter((book) => book.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home myList={myList} />} />
        <Route
          path="/explore"
          element={<Explore onAddToMyList={handleAddToMyList} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/mylist"
          element={<MyList myList={myList} onAddToMyList={handleAddToMyList} onDelete={handleDeleteBook} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
