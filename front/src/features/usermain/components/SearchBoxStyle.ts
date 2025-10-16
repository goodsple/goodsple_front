/* SearchBox.tsx */

import styled from "styled-components";

export const SearchIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  transform: translateX(150%);
`;

export const SearchIcon2 = styled.img`
  position: absolute;
  right: 20px;
  width: 45px;
  height: 45px;
`;

export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const SearchInputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transform: translateX(12%);
`;

export const PopularKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-left: 30px;
  transform: translateX(40%);
  z-index: 9;
  position: relative;
`;

export const RealTimePopularKeywords1 = styled.span`
  font-size: 20px;
  font-weight: 300;
  color: #997BEB;
  font-family: 'Pretendard', sans-serif;
  letter-spacing: -1px;
`;

export const RealTimePopularKeywords2 = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #444444;
  font-family: 'Pretendard', sans-serif;
  letter-spacing: -1px;
`;

export const SearchInput = styled.input`
  width: 670px;
  height: 65px;
  border: 1px solid #997BEB;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
  font-family: 'Pretendard', sans-serif;
  letter-spacing: -1px;
  padding: 0 80px 0 10px;
  color: #444; /* 입력 중 텍스트 색상 */

  &::placeholder {
    color: #E0E0E0;
  }

  &:focus {
    border: 1px solid #997BEB;
    color: #444;
    outline: none;
    box-shadow: 0 0 0 2px rgba(153, 123, 235, 0.2);
  }
`;
