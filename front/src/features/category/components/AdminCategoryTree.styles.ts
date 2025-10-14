import styled from 'styled-components';

// 전체 Wrapper
export const TreeWrapper = styled.div`
width: 100%;
  padding: 24px;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;  // 가로 중앙
`;


// 트리 + 편집 패널 컨테이너
export const TreeContainer = styled.div`
 display: flex;
  gap: 24px;
  width: 800px;           // 전체 최대 너비
  max-width: 100%;
  margin-top: 10px;       // 상단 띄움
  height: 500px;          // 고정 높이
`;

// 왼쪽 트리 영역
export const TreeSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
  overflow-y: auto;       // 세로 스크롤
  scrollbar-width: thin;  // 파이어폭스 스크롤 스타일
  scrollbar-color: #ccc #f9f9f9;

  h3 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding-left: 16px;

    li {
      margin: 4px 0;
      span {
        cursor: pointer;
      }
    }
  }
`;

// 오른쪽 편집 패널
export const PanelSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  background-color: #fff;
  padding: 16px;
  border-left: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
  overflow-y: auto;       // 세로 스크롤
  scrollbar-width: thin;
  scrollbar-color: #ccc #f9f9f9;

  h4 {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;


export const InputGroup = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  min-width: 80px;
  font-weight: 500;
`;

export const TextInput = styled.input.attrs({ type: 'text' })`
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-left: 8px;
  font-size: 14px;
`;

export const Button = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #b1ff90;
  color: #444;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:disabled {
    background-color: #eee;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #9ae673;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RadioInput = styled.input``;

export const MoveButtons = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;






