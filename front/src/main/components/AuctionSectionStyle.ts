import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: 48px 0 72px;
  display: flex;
  justify-content: center;
`;

export const Window = styled.div`
  width: 100%;
  max-width: 960px; 

  background-color: #ffffff;
  border: 1px solid #d7d2dd;
  box-shadow: 12px 12px 2px #DBDBDB;

  display: flex;
  flex-direction: column;
`;

export const WindowHeader = styled.div`
  height: 52px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f7c8f0;        /* 시안 핑크 */
  border-bottom: 1px solid #e2b4df;
`;

export const WindowTitle = styled.h2`
  margin: 0;
  font-family: "Jersey 20", "Pretendard", sans-serif;
  font-size: 24px;
  letter-spacing: 0.05em;
  color: #1f1824;
`;

export const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .yellow {
    background-color: #ffe86c;
  }
  .gray {
    background-color: #94949b;
  }
  .red {
    background-color: #f46b6b;
  }
`;

export const WindowBody = styled.div`
  padding: 32px 40px 40px; 
  display: grid;
  grid-template-columns: 1.1fr 1.2fr;
  align-items: center;
  column-gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }
`;

// 왼쪽 썸네일 영역
export const ThumbArea = styled.div`
  display: flex;
  justify-content: center;
`;

export const ThumbCard = styled.div`
  width: min(220px, 40vw); 
  aspect-ratio: 3 / 4;
  background-color: #d8d8d8;  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThumbImage = styled.img`
  max-width: 80%;
  height: auto;
`;

export const InfoArea = styled.div`
  text-align: center;
`;

export const InfoTopLabel = styled.p`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 500;
  color: #222;
`;

export const AuctionTitle = styled.h3`
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 700;
  color: #111;
`;

export const PriceTable = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
  text-align: left;
  font-size: 16px;

  .row {
    display: flex;
    justify-content: flex-start;
    gap: 40px;
  }

  .label {
    color: #444;
    min-width: 80px;
  }

  .value {
    color: #111;
  }

  .highlight {
    position: relative;
    display: inline-block;   
    padding: 0 2px;          
    font-weight: 700;
    z-index: 1;
  }

  .highlight::before {
    content: "";
    position: absolute;
    z-index: -1;

    /* 숫자보다 아주 살짝만 크게 */
    top: -2px;
    bottom: -3px;
    left: -6px;
    right: -6px;

    background-color: #e9e1ff;

    /* 기울기는 살짝만 */
    transform: rotate(-7deg); 
    transform-origin: center;
  }
`;


export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const JoinButton = styled.button`
  width: 380px;                
  max-width: 100%;
  height: 56px;                
  border-radius: 0;
  background-color: #444444;
  color: #ffffff;
  font-size: 20px;             
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-style: none;
`;

