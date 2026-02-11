// // CategoryBoard.styles.ts
// import styled from 'styled-components';

// export const BoardWrapper = styled.div`
//   width: 1200px;
//   margin: 60px auto;  // 검색창 위 여백 추가
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// export const BoardSearchWrap = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 10px;
// `;

// // export const BoardSearchInput = styled.input`
// //   padding: 8px 12px;
// //   border: 1px solid #997BEB;
// //   border-radius: 5px;
// //   font-family: 'Pretendard', sans-serif;
// //   font-size: 15px;
// //   color: #444444;

// //   &::placeholder {
// //     color: rgba(153, 123, 235, 0.5);
// //   }
// // `;

// // export const SearchButton = styled.button`
// //   background: none;
// //   border: none;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;

// //   img {
// //     width: 20px;
// //     height: 20px;
// //   }
// // `;

// export const WriteButton = styled.button`
//   background-color: #997BEB;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   padding: 8px 16px;
//   font-weight: 600;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;


  

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// export const CateTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   font-family: 'Pretendard', sans-serif;
// `;

// export const TableHead = styled.thead`
//   background-color: #f5f5f5;
// `;

// export const TableRow = styled.tr`
//   &:hover {
//     background-color: #f9f9f9;
//   }
// `;

// export const TableHeader = styled.th`
//   padding: 12px;
//   text-align: center;
//   border-bottom: 2px solid #997BEB;
//   font-weight: 600;
// `;

// export const TableData = styled.td`
//   padding: 12px;
//   text-align: center;
//   border-bottom: 1px solid rgba(153, 123, 235, 0.5);
//   vertical-align: middle;

//   img {
//     width: 20px;
//     height: 20px;
//     margin: 0 2px;
//     cursor: pointer;
//   }
// `;

// export const EmptyRow = styled.tr`
//   td {
//     text-align: center;
//     padding: 20px;
//     color: #999999;
//   }
// `;



import styled from 'styled-components';

export const BoardWrapper = styled.div`
  width: 1200px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const BoardSearchWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const WriteButton = styled.button`
  background-color: #997beb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
`;

/* 카드 그리드 */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

export const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f2f2f2;
`;

export const CardBody = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222;
  line-height: 1.3;
  
  display: -webkit-box;
  -webkit-line-clamp: 1;     /* 두 줄 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusBadge = styled.span<{ status: string }>`
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;

  // background: {({ status }) =>
  //   status === 'AVAILABLE' ? '#e8e1ff' :
  //   status === 'ONGOING' ? '#fff1d6' :
  //   '#eeeeee'};

  // color: {({ status }) =>
  //   status === 'AVAILABLE' ? '#6037ff' :
  //   status === 'ONGOING' ? '#9a5a00' :
  //   '#777'};

      background: ${({ status }) => 
        status === 'AVAILABLE' ? 'linear-gradient(135deg, #ffbdf0 0%, #cdd8ff 100%)' :
        status === 'ONGOING' ? 'linear-gradient(135deg, #ffd27f 0%, #ffb85c 100%)' :
        '#e0e0e0'};
    
    color: ${({ status }) => 
        status === 'AVAILABLE' ? '#6037ff' :
        status === 'ONGOING' ? '#743d07ff' :
        '#444444'};


`;

export const SubInfo = styled.div`
  font-size: 12px;
  color: #888;
`;

export const MoreButton = styled.button`
  align-self: center;
  padding: 12px 30px;
  border-radius: 30px;
  border: 1px solid #ddd;
  background: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;
