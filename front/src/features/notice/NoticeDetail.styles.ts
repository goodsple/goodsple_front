import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const TitleSection = styled.div`
  margin-bottom: 30px;
`;

export const MenuLabel = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #D9D9D9;
  margin: 15px 0;
`;

export const NoticeTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #222;
`;

export const NoticeDate = styled.p`
  font-size: 14px;
  color: #888;
`;

export const Content = styled.pre`
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  white-space: pre-wrap;
  word-break: keep-all;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

export const BackButton = styled.button`
  padding: 10px 50px;
  background-color: #997BEB;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

//   &:hover {
//     background-color: #a1f07f;
//   }
`;
