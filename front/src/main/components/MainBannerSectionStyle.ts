import styled from "styled-components";

// 세로가 가로 비율에 맞춰서 좀 긴 버전
// export const BannerSection = styled.div`
//   width: 100%;
//   overflow: hidden;
//   margin-top: 60px;
// `;

// export const BannerImage = styled.img`
//     width: 100%;   
//     height: auto;    
//     display: block;
// `;

//  세로가 넘 길다 좀 조정이 필요하다 싶으면 아래 코드 
export const BannerSection = styled.div`
  width: 100%;
  height: 420px;        
  overflow: hidden;
  margin-top: 60px;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;   
  object-position: center top;
`;