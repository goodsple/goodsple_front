import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%; /* 컬럼 높이를 채움 */
`;

export const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #444;
  margin: 0 0 16px 0;
  word-break: keep-all;
  line-height: 1.4;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

export const AuctionRulesButton = styled.button`
  background: transparent;
  border: 1px solid #d9d9d9;
  color: #888;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-start; /* 버튼을 왼쪽 정렬 */
  margin-top: 24px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #997BEB;
    color: #997BEB;
  }
`;