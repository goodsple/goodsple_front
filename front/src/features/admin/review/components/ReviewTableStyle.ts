
import styled from 'styled-components';

interface ButtonProps {
    variant: 'blind' | 'restore' | 'cancel';
}

export const Table = styled.table`
    width:100%;
    border-collapse:collapse; 
    text-align:center;
    
    th,td{
        padding:12px 8px;
        border-bottom:1px solid #e0e0e0;
    }

    th{
        background:#fafafa;
        font-weight:600;
    }

    tbody tr:hover {
        background: #997BEB;
        color: #fff;
        cursor: pointer;
    }
    .ellipsis {
      max-width: 200px;       
      white-space: nowrap;    
      overflow: hidden;       
      text-overflow: ellipsis;
    }
`;
export const Button = styled.button<ButtonProps>`
  padding: 4px 12px;
  background: #fff;
  border: 1px solid #444;
  color: #444;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: ${({ variant }) =>
      variant === 'blind'   ? '#E03131' :
      /* restore */          '#444'};
    color: #fff;
  } 
`;
