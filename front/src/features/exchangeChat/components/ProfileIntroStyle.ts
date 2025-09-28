import styled from 'styled-components';

export const Wrap = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  grid-auto-rows: min-content;
  row-gap: 8px;  
  margin-top:60px;        
`;

export const Avatar = styled.div`
  width: 168px;           
  height: 168px;
  border-radius: 50%;
  background: #eee center/cover no-repeat;
  border: 1px solid #EAE7E2;
  margin-bottom: 8px;     
`;

export const NameRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

export const Badge = styled.span`
  width: 16px; 
  height: 16px; 
  display: inline-block;

`;

export const Level = styled.div`
  margin-top: 2px;       
  font-size: 14px;
  font-weight: normal;       
`;
