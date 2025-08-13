// admin/pages/AdminAuctionPageStyle.ts (최종본)

import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
`;

export const ContentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

// ✨ 아래부터 추가된 스타일 컴포넌트

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: 80px;
  flex-shrink: 0; /* 너비 고정 */
`;

export const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 300px;
`;

export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

// ✨ 여기까지 추가

export const TabGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f1f3f5;
  margin-bottom: 24px;
`;

export const StatusFilterGroup = styled.div`
  display: flex;
`;

export const StatusTab = styled.button<{ $isActive: boolean }>`
  padding: 12px 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ $isActive }) => $isActive ? '#997BEB' : '#868e96'};
  font-size: 16px;
  font-weight: ${({ $isActive }) => $isActive ? '700' : '500'};
  border-bottom: 2px solid ${({ $isActive }) => $isActive ? '#997BEB' : 'transparent'};
  margin-bottom: -2px;
  min-width: 80px;
  text-align: center;
`;

export const RegisterButton = styled.button`
  background-color: #997BEB;
  color: white; // 글자색 흰색으로 수정
  border: none; // 테두리 제거
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`;