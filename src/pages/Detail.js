import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Logo from "../components/Logo";
import axios from "axios";

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

const Detail = () => {
  const { id } = useParams(); // URL 파라미터로 id 받기
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        const response = await axios.get(
          `http://api.kcisa.kr/openapi/API_CCA_146/request?serviceKey=${process.env.REACT_APP_SERVICE_KEY}&numOfRows=1&pageNo=1&id=${id}`
        );
        const item = response?.data?.response?.body?.items?.item[0];
        setReview(item);
      } catch (error) {
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
        <Title text={review.title} />
        <InfoWrapper>
          <InfoItem>
            <strong>주된 책임을 진 개체:</strong> {review.responsibleEntity}
          </InfoItem>
          <InfoItem>
            <strong>발행기관:</strong> {review.publisher}
          </InfoItem>
          <InfoItem>
            <strong>소속(DB):</strong> {review.affiliation}
          </InfoItem>
          <InfoItem>
            <strong>제목:</strong> {review.title}
          </InfoItem>
          <InfoItem>
            <strong>주제 카테고리:</strong> {review.category}
          </InfoItem>
          <InfoItem>
            <strong>등록 날짜:</strong> {review.registrationDate}
          </InfoItem>
          <InfoItem>
            <strong>URL:</strong> <a href={review.url} target="_blank" rel="noopener noreferrer">{review.url}</a>
          </InfoItem>
        </InfoWrapper>
      </Right>
    </Layout>
  );
};

// 스타일링
const InfoWrapper = styled.div`
  margin-top: 20px;
`;

const InfoItem = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 1.5;
  strong {
    color: #555;
  }
`;

export default Detail;
