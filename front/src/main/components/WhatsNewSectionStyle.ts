import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: 15px 0px 20px;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const SectionHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const CardWrapper = styled.div`
  margin-top: 8px;
  padding: 14px 0 28px;   
  display: flex;
  flex-direction: column;
  align-items: center;   
  gap: 16px;
`;

export const Title = styled.h2`
  font-family: "Jersey 20", "Pretendard", sans-serif;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: #444;      
  text-align: center;
`;

export const CardGrid = styled.div`
  max-width: 1040px;         
  padding: 0 8px;             
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;               
`;

export const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #f3e8ff;     
  padding: 10px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  box-shadow: 0 3px 0 #f6bfff;    
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 #c4b5ff;  
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1; 
  background-color: #f3f4f6;
`;


export const CardContent = styled.div`
  padding-top: 6px;
`;

export const PostTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: #111827;
`;

export const PaginationRow = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;   
  align-items: center;
  gap: 56px;                
`;


export const PageArrowButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;        
  border: 1.8px solid #222;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #222;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;


export const PageCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: "Jersey 20", "Pretendard", sans-serif;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: #111;

  .current {
    font-weight: 700;
  }

  .total {
    font-weight: 700;
  }

  .dash {
    font-weight: 400;
  }
`;

