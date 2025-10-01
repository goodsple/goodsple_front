import styled from "styled-components";

export const Container = styled.div`
  max-width: 1300px;
  min-width: 1300px;
  min-height: 100vh;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterBtn = styled.button<{ active?: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ active }) => (active ? "#444" : "#eee")}; 
  color: ${({ active }) => (active ? "#fff" : "#444")};             
  transition: all 0.2s ease;
`;


export const NoResult = styled.div`
  max-width: 1300px;
  font-size: 16px;
  color: gray;
  margin-top: 50px;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap; // 줄바꿈 허용
  gap: 30px;
  justify-content: flex-start;
`;

export const Card = styled.div`
  flex: 0 0 calc(25% - 30px); /* 한 줄에 4개 */
  min-width: 300px;
  max-width: 300px;          
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;


export const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%; /* 정사각형 비율 유지 */
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 꽉 채우기 */
  }
`;

export const Info = styled.div`
  height: 130px;
  padding: 12px;
`;

export const TitleText = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 7px 0;
`;

export const Meta = styled.p`
  font-size: 14px;
  color: #444;
  margin: 5px 0;
`;

export const StatusBox = styled.span<{ status: string }>`
  display: inline-block;
  padding: 3px 7px;
  border-radius: 7px;
  font-size: 14px;
  color: white;

  background-color: ${({ status }) =>
    status === "AVAILABLE" ? "#43be5fff" :  // 연두색
    status === "ONGOING" ? "#ebae2aff" :   // 노란색
    status === "COMPLETED" ? "#ef4747ff" : // 빨간색
    "#999"};                              // 기본 회색
`;


export const Date = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;
