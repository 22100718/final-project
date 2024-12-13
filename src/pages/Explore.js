import React, { useEffect, useState } from "react";
import { fetchReviews } from "../api/apiClient"; // apiClient.js에서 함수 가져오기

function Explore() {
  const [reviews, setReviews] = useState([]); // 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  useEffect(() => {
    // 데이터 요청을 보내는 함수
    const fetchData = async () => {
      try {
        const params = {
          pageNo: 1, // 예시: 첫 페이지
          numOfRows: 10, // 예시: 한 번에 가져올 데이터의 수
        };

        // API에서 데이터 가져오기
        const data = await fetchReviews(params);
        setReviews(data.items); // 데이터를 상태에 저장
      } catch (error) {
        setError("데이터를 가져오는 데 실패했습니다."); // 오류 처리
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  // 로딩 중일 때 화면에 표시할 내용
  if (loading) return <div>로딩 중...</div>;

  // 오류가 발생한 경우
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Explore Page</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.title}</h3>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Explore;
