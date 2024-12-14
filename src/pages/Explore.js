import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import MainLayout from "../components/MainLayout";
import Title from "../components/Title";
import { Link } from "react-router-dom"; // Link 컴포넌트를 import

const Explore = ({
  data,
  error,
  onAddToMyList,
  handleNextPage,
  handlePreviousPage,
  pageNo,
}) => {
  if (error) return <div>{error}</div>;

  // 데이터 10개씩만 보여주기
  const displayedData = data.slice((pageNo - 1) * 10, pageNo * 10);

  // 더 이상 데이터가 없으면 "다음" 버튼 비활성화
  const isLastPage = displayedData.length < 10;

  return (
    <MainLayout>
      <Title>탐색 페이지</Title>

      {/* 페이지 네비게이션 - 상단에 배치 */}
      <ReviewList>
        {displayedData.map((review) => (
          <ReviewItem key={review.id}>
            <ReviewContent>
              <ReviewTitle>{review.title}</ReviewTitle>
              {/* 상세 보기 버튼 (왼쪽) */}
              <Link to={`/detail/${review.id}`}>
                <Button>상세 보기</Button>
              </Link>
            </ReviewContent>
            {/* 책 추가 버튼 (오른쪽) */}
            <Button onClick={() => onAddToMyList(review)}>추가</Button>
          </ReviewItem>
        ))}
      </ReviewList>

      {/* 페이지 넘기기 버튼을 하단에 배치 */}
      <NavigationBar>
        <Button onClick={handlePreviousPage}>이전</Button>
        <PageNumber>페이지: {pageNo}</PageNumber>
        <Button 
          onClick={handleNextPage} 
          disabled={isLastPage} // 마지막 페이지이면 "다음" 버튼 비활성화
        >
          다음
        </Button>
      </NavigationBar>
    </MainLayout>
  );
};

// 스타일링
const NavigationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 버튼 간격을 더 넓게 */
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-top: 20px; /* 버튼을 하단에 배치 */
`;

const PageNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 항목 간 간격을 더 넓게 */
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ReviewContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1; /* 버튼들 사이에 공간을 만들기 위해서 */
  gap: 20px; /* 책 제목과 버튼들 간 간격 */
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export default Explore;
