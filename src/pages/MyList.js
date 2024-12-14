import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 추가
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS 추가

const MOCK_API_URL = "https://672f3fc9229a881691f25065.mockapi.io/users";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Left = styled.div`
  width: 200px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Right = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  h4 {
    margin: 0;
  }
  .info {
    color: #555;
    font-size: 14px;
    margin-top: 8px;
  }
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(MOCK_API_URL);
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      const data = await response.json();
      setMyList(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("목록을 불러오는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      setMyList((prevList) => prevList.filter((book) => book.id !== id));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await fetch(`${MOCK_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }
      const updatedBook = await response.json();
      setMyList((prevList) =>
        prevList.map((book) => (book.id === id ? updatedBook : book))
      );
      alert("수정되었습니다.");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`); // 디테일 페이지로 이동
  };

  const handleVisit = (url) => {
    window.open(url, "_blank"); // URL 새 탭으로 열기
  };

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        <Title text="내 리스트" />
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {myList.length === 0 && !loading ? (
          <p>관심 도서 목록이 비어 있습니다.</p>
        ) : (
          myList.map((book) => (
            <BookCard key={book.id}>
              <h4>{book.title}</h4>
              <div className="info">
                <p>카테고리: {book.category || "N/A"}</p>
                <p>발행기관: {book.publisher || "N/A"}</p>
              </div>
              <div>
                <Button
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setCurrentBook(book)}
                >
                  수정
                </Button>
                <Button onClick={() => handleDelete(book.id)}>삭제</Button>
                <Button onClick={() => handleVisit(book.url)}>방문</Button>
                <Button onClick={() => handleDetail(book.id)}>상세 보기</Button>
              </div>
            </BookCard>
          ))
        )}

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  수정하기
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">제목</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook?.title || ""}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">카테고리</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook?.category || ""}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">발행기관</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook?.publisher || ""}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, publisher: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  닫기
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave(currentBook.id, currentBook)}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </Right>
    </Layout>
  );
};

export default MyList;
