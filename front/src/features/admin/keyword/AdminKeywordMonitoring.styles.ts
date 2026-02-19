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

export const ActionButton = styled.button<{
  variant?: 'block' | 'unblock' | 'default';
}>`
  padding: 6px 12px;
  margin: 0 4px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ variant }) =>
    variant === 'block'
      ? '#f9f9f9'
      : variant === 'unblock'
      ? '#f4f6f8'
      : 'white'};

  border: 1px solid
    ${({ variant }) =>
      variant === 'block'
        ? '#c62828'
        : variant === 'unblock'
        ? '#2e7d32'
        : '#ccc'};

  color: ${({ variant }) =>
    variant === 'block'
      ? '#c62828'
      : variant === 'unblock'
      ? '#2e7d32'
      : '#333'};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'block'
        ? '#c62828'
        : variant === 'unblock'
        ? '#2e7d32'
        : '#444'};

    color: white;
  }

  &:disabled {
    background-color: #d9d9d9;
    color: #ffffff;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const StatusText = styled.span<{ status: 'VISIBLE' | 'BLOCKED' }>`
  color: ${({ status }) =>
    status === 'BLOCKED' ? '#e53935' : 'inherit'};
  font-weight: ${({ status }) =>
    status === 'BLOCKED' ? '600' : '400'};
`;
