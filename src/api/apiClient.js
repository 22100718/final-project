const API_BASE_URL = "http://api.kcisa.kr/openapi/API_CCA_146/request";
const API_KEY = "2526d79d-1de7-4c8f-8e34-4d4959478877";

// 리뷰 데이터를 가져오는 함수
export async function fetchReviews(params) {
  const url = new URL(API_BASE_URL);
  
  // API Key 추가
  url.searchParams.append("serviceKey", API_KEY);
  
  // 전달된 파라미터를 URL에 추가
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  try {
    // Fetch API로 요청 보내기
    const response = await fetch(url);
    
    // 응답 상태 체크 (200번대 상태가 아니면 오류 처리)
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    
    // JSON 형식으로 응답 데이터 반환
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // 호출한 쪽에서 예외 처리할 수 있도록 에러 다시 던짐
  }
}
