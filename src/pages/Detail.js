import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Logo from "../components/Logo";
import axios from "axios";

const MOCK_API_URL = "https://672f3fc9229a881691f25065.mockapi.io/users"; // MockAPI URL

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Left = styled.div`
  width: 200px;
  background-color: #f8f9fa; /* 기본 배경색 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* 기본 그림자 효과 */
`;

const Right = styled.div`
  flex: 1;
  padding: 40px;
  background: #f5f6fa; /* 밝은 배경 */
`;

const Card = styled.div`
  background: #ffffff; /* 카드 배경 */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px); /* 호버 시 위로 살짝 이동 */
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2); /* 더 깊은 그림자 */
  }
`;

const Detail = () => {
  const { id } = useParams(); // URL 파라미터로 id 받기
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        // MockAPI에서 id 기반 데이터 가져오기
        const response = await axios.get(`${MOCK_API_URL}/${id}`);
        setReview(response.data); // 가져온 데이터를 상태로 설정
      } catch (error) {
        console.error("Error fetching detail:", error);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviewDetail();
  }, [id]); // id가 변경될 때마다 호출

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <Layout>
      <Left>
        <Logo />
        <Sidebar />
      </Left>
      <Right>
        <Card>
          {/* <Title text={review.title || "제목 없음"} /> */}
          <InfoWrapper>
            <InfoItem>
              <InfoLabel>주된 책임을 진 개체:</InfoLabel> {review.creator || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>발행기관:</InfoLabel> {review.publisher || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>소속(DB):</InfoLabel> {review.collectionDb || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>제목:</InfoLabel> {review.title || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>주제 카테고리:</InfoLabel> {review.subjectCategory || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>등록 날짜:</InfoLabel> {review.regDate || "정보 없음"}
            </InfoItem>
            <InfoItem>
              <InfoLabel>URL:</InfoLabel>{" "}
              {review.url ? (
                <StyledLink href={review.url} target="_blank" rel="noopener noreferrer">
                  {review.url}
                </StyledLink>
              ) : (
                "정보 없음"
              )}
            </InfoItem>
          </InfoWrapper>
        </Card>
      </Right>
    </Layout>
  );
};

// 스타일링
const InfoWrapper = styled.div`
  margin-top: 20px;
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.7;
  color: #2d3436; /* 텍스트 색상 */
`;

const InfoLabel = styled.strong`
  color: #0984e3; /* 강조 텍스트 */
`;

const StyledLink = styled.a`
  color: #00cec9; /* 링크 색상 */
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #6c5ce7;
    text-decoration: underline;
  }
`;

export default Detail;
