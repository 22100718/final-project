import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList"; // MyList 컴포넌트
import axios from "axios";

const App = () => {
  const [myList, setMyList] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0); // 조회 카운터
  const [pageNo, setPageNo] = useState(1); // 현재 페이지 상태 추가

  const serviceKey = process.env.REACT_APP_SERVICE_KEY;

  // 책을 내 리스트에 추가하는 함수
  const handleAddToMyList = (book) => {
    if (myList.some((item) => item.id === book.id)) {
      alert("이미 내 리스트에 추가된 책입니다.");
      return;
    }
    setMyList((prevList) => [...prevList, book]);
  };

  // 책을 내 리스트에서 삭제하는 함수
  const handleDeleteBook = (id) => {
    setMyList((prevList) => prevList.filter((book) => book.id !== id));
  };

  // 책 제목을 수정하는 함수
  const handleUpdateBook = (id, newTitle) => {
    setMyList((prevList) =>
      prevList.map((book) =>
        book.id === id ? { ...book, title: newTitle } : book
      )
    );
  };

  // API로부터 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://api.kcisa.kr/openapi/API_CCA_146/request?serviceKey=${serviceKey}&numOfRows=50&pageNo=${pageNo}`
        );
        
        const items = response?.data?.response?.body?.items;
        setData(items?.item || []);
        setRequestCount((prevCount) => prevCount + 1); // 조회 카운트 증가
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError("데이터를 불러오지 못했습니다.");
      }
    };

    getData();
  }, [serviceKey, pageNo]); // pageNo가 변경될 때마다 호출

  // 페이지 이동 함수 (다음 페이지로 이동)
  const handleNextPage = () => {
    setPageNo((prevPage) => prevPage + 1);
  };

  // 페이지 이동 함수 (이전 페이지로 이동)
  const handlePreviousPage = () => {
    setPageNo((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home myList={myList} data={data} error={error} requestCount={requestCount} />}
        />
        <Route
          path="/explore"
          element={
            <Explore
              data={data}
              error={error}
              onAddToMyList={handleAddToMyList}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              pageNo={pageNo}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/mylist"
          element={
            <MyList
              myList={myList}
              onDelete={handleDeleteBook}
              onUpdate={handleUpdateBook} // onUpdate 함수 전달
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
