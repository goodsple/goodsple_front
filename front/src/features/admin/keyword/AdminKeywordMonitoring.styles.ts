import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
`;

export const KeywordTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  th {
    background: #f2f2f2;
  }
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  margin: 0 4px;
  font-size: 14px;
  border: 1px solid #888;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #444444;
    color: white;
    border-color: #444444;
  }
`;
