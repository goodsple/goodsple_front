import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
`;

// ✨ Title 컴포넌트는 더 이상 사용하지 않으므로 삭제합니다.

export const ContentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

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
  
  /* ✨ 버튼 크기 통일을 위한 속성 */
  min-width: 80px;
  text-align: center;
`;

export const RegisterButton = styled.button`
  /* ✨ 보라색 배경으로 복구 */
  background-color: #997BEB;
  color: #444;
  border: 1px solid #dee2e6;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`;