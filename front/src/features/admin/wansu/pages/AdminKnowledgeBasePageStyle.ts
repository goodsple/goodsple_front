import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
  /*  회색 배경 제거 */
  min-height: calc(100vh - 70px);
`;

export const ContentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /*  선(border) 관련 스타일 제거 */
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  width: 80px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 300px;
  font-size: 14px;
`;

export const TabGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*  탭 그룹 밑으로 선 이동 */
  border-bottom: 2px solid #f1f3f5;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const StatusFilterGroup = styled.div`
  display: flex;
`;

export const StatusTab = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${({ $isActive }) => $isActive ? '#997BEB' : 'transparent'};
  color: ${({ $isActive }) => $isActive ? '#997BEB' : '#868e96'};
  cursor: pointer;
  margin-bottom: -2px;
`;

export const AddButton = styled.button`
  background-color: #997BEB;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th, td {
    border-bottom: 1px solid #dee2e6;
    padding: 14px 12px;
    text-align: center;
    vertical-align: middle;
  }

  th { background-color: #f8f9fa; font-weight: 600; }
  tbody tr:hover { background-color: #f1f3f5; }
`;

export const Tr = styled.tr<{ $isInactive?: boolean }>`
  color: ${({ $isInactive }) => $isInactive ? '#adb5bd' : 'inherit'};
  text-decoration: ${({ $isInactive }) => $isInactive ? 'line-through' : 'none'};
`;

export const ActionButton = styled.button<{ $variant: string }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  margin: 0 4px;
  background-color: ${({ $variant }) => $variant === '수정' ? '#997BEB' : '#444444'};
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;