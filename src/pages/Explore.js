import React, { useEffect, useState } from "react";
import { fetchReviews } from "../api/apiClient";
import Content from "../components/Content";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button"; // 추가 버튼을 위한 컴포넌트
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가

const Explore = ({ onAddToMyList }) => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // navigate 함수 선언

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data.items);
        setFilteredReviews(data.items); // 초기값 설정
      } catch (error) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) =>
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
  }, [searchTerm, reviews]);

  const handleAddToMyList = (review) => {
    onAddToMyList(review); // 부모 컴포넌트에서 리스트에 추가하는 함수 호출
    navigate("/mylist"); // MyList 페이지로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Title text="탐색 페이지" />
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      {filteredReviews.length > 0 ? (
        <div>
          <Content items={filteredReviews} />
          <div>
            {filteredReviews.map((review) => (
              <div key={review.id}>
                <Button onClick={() => handleAddToMyList(review)}>추가</Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default Explore;
