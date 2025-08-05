import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th, td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #D9D9D9;
  }

  th {
    font-weight: bold;
  }
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

// export const ManageButton = styled.button`
//   width: 100px;
//   padding: 5px 15px;
//   background-color: #997BEB;
//   color: white;
//   cursor: pointer;
//   border: 1px solid #9A9A9A;
//   font-size: 14px;
//    border-radius: 10px;


//   &:hover {
//     background-color: #997BEB;
//     color: white;
//   }
// `;

export const ManageButton = styled.button<{ $written: boolean }>`
  width: 130px;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background-color: ${({ $written }) => ($written ? '#444444' : '#997BEB')};
  border: none;
`;
