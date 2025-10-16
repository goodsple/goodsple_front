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

  .ellipsis {
    max-width: 200px;     
    white-space: nowrap;    
    overflow: hidden;       
    text-overflow: ellipsis;
  }
`;


export const Button = styled.button`
  margin: 0 4px;
  padding: 5px 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #444;
  background: #fff;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #E03131;
    color: #fff;
  }

  &:disabled {
    background: #D9D9D9;   
    color: #666;          
    border-color: #bbb;   
    cursor: not-allowed;   
    /* pointer-events: none; 
  }
  
`;
