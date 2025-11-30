import styled from "styled-components";
 
export const BannerSection = styled.section`
  width: 100%;
  margin-top: 60px;
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  /* 최소 340px, 최대 500px / 화면 너비에 비례해서 유동 */
  height: clamp(340px, 32vw, 500px);
  display: block;
  object-fit: cover;
  object-position: center top;
`;