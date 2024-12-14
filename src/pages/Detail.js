import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewDetail } from "../api/apiClient";
import Title from "../components/Title";

const Detail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviewDetail(id);
        setReview(data);
      } catch (error) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <div>
      <Title text={review.title} />
      <p>{review.description}</p>
      <p>작성자: {review.author}</p>
      <p>작성일: {review.date}</p>
    </div>
  );
};

export default Detail;
