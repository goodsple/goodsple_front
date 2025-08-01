import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  margin-top: 40px;

  th, td {
    padding: 12px 8px;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
  }

  th {
    background: #f5f5f5;
    font-weight: 600;
  }

  tbody tr:hover {
    background: #997BEB;
    color: #fff;
    cursor: pointer;
  }
`;

interface ButtonProps { danger?: boolean; }
export const Button = styled.button<ButtonProps>`
  margin: 0 4px;
  padding: 5px 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  background: ${({ danger }) => (danger ? '#fff' : '#997BEB')};
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    opacity: 0.9;
  }
`;
