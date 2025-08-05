import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  background-color: #FFFDFA;
`;

export const TitleHeader = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 40px 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;

  & span {
    margin-bottom: 8px;}
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
`;

export const Date = styled.span`
  font-size: 14px;
  color: #888;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #997BEB;
  font-weight: bold;
  background-color: #fff;

  &:hover {
    background-color: #e5e5e5;
  }
`;

