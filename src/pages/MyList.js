import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

// 모달 컴포넌트
const Modal = ({ isOpen, onClose, onSave, book }) => {
  const [newTitle, setNewTitle] = useState(book.title);

  const handleSave = () => {
    onSave(book.id, newTitle);
    onClose();
  };

  return (
    isOpen && (
      <ModalOverlay>
        <ModalContent>
          <h3>수정하기</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div>
            <button onClick={handleSave}>저장</button>
            <button onClick={onClose}>취소</button>
          </div>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

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

const MyList = ({ myList, onDelete, onUpdate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setModalOpen(true);
  };

  const handleSave = (id, newTitle) => {
    onUpdate(id, newTitle); // 부모로부터 전달된 onUpdate 함수 호출
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleVisit = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        <Title text="내 리스트" />
        {myList.length === 0 ? (
          <p>관심 도서 목록이 비어 있습니다.</p>
        ) : (
          myList.map((book) => (
            <BookCard key={book.id}>
              <h4>{book.title}</h4>
              <p>{book.description}</p>
              <div>
                <Button onClick={() => handleEdit(book)}>수정</Button>
                <Button onClick={() => handleDelete(book.id)}>삭제</Button>
                <Button onClick={() => handleVisit(book.url)}>방문</Button>
                <Button onClick={() => handleDetail(book.id)}>상세 보기</Button>
              </div>
            </BookCard>
          ))
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          book={currentBook || {}}
        />
      </Right>
    </Layout>
  );
};

export default MyList;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  h3 {
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
`;
