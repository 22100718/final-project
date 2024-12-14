import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const Modal = ({ book, onClose, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);

  const handleSave = () => {
    onSave({ id: book.id, title, description });
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>도서 수정</h2>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>설명:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>취소</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
