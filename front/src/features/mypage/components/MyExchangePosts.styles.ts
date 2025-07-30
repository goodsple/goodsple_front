import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px; /* 원하는 최대 너비 */
  margin: 0 auto;     /* 중앙 정렬 */
  padding: 0 20px;    /* 양쪽 여백 */
`;

export const TabWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-bottom: 2px solid #ccc;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 32px;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#997BEB' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
`;

export const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ManageButton = styled.button`
  margin: 5px;
  padding: 5px 15px;
  color: #444;
  background-color: none ;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
