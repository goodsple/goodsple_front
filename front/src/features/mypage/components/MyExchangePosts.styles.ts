import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  min-width: 1200px; /* 최소 너비 */
  margin: 0 auto;
  padding: 40px 20px 60px;
  box-sizing: border-box;
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
  font-size: 20px;
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
    // background-color: #f9f9f9;
    font-weight: bold;
  }
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ManageButton = styled.button`
  width: 100px;
  margin: 5px;
  padding: 5px 15px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #9A9A9A;
  font-size: 14px;

  &:hover {
    background-color: #997BEB;
    color: white;
  }
`;

export const StatusDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 8px;
`;

export const StatusButton = styled.button<{ selected?: string }>`
  width: 102px;
  margin-left: 8px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #9A9A9A;
  background-color: white;
  color: #444;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StatusOptions = styled.ul`
  position: absolute;
  top: 30px;
  left: 8px;
  background: white;
  border: 1px solid #9A9A9A;
  padding: 0;
  margin: 0;
  width: 100px;
  z-index: 10;
`;

export const StatusOption = styled.li<{ selected?: boolean }>`
  padding: 8px 10px;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  text-align: left;  
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};

  &:hover {
    background-color: #997BEB;
    color: white;
  }
`;

export const DropdownIcon = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  object-fit: contain;
  padding-left: 10px;
`;


export const TabFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
//   border-bottom: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  padding-bottom: 4px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
