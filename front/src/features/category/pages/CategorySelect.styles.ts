// CategorySelect.styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  padding: 16px;
  width: 800px;
`;

export const Header = styled.div`
  background: #b39ddb;
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
`;

export const Columns = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const Column = styled.div<{ hasDivider?: boolean }>`
  flex: 1;
  padding: 0 16px;
  max-height: 200px;  // 스크롤 높이
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start; // 행 간격을 첫 행 기준으로 정렬

   /* 컬럼 사이 구분선 */
  border-right: ${({ hasDivider }) => (hasDivider ? "1px solid #e0e0e0" : "none")};

`;

export const ColumnHeader = styled.div`
  font-weight: bold;
  margin-bottom: 6px;
  text-align: center;
  background: #e0d7f5;
  padding: 5px 0;
  border-radius: 8px;
  width: 100%;
`;

export const CheckboxLabel = styled.label`
  width: 33.33%;  // 한 행에 3개
  box-sizing: border-box;
  margin-bottom: 4px;
  display: flex;
  align-items: center; // 중앙 정렬
  height: 28px;        // 고정 높이

  // 기본 체크박스 숨기기
  input[type="checkbox"] {
    opacity: 0; /* 기본 체크박스 숨김 */
    position: absolute;
    width: 18px;
    height: 18px;
    margin: 0;
    cursor: pointer;
  }

  // 커스텀 체크박스 스타일
  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #b39ddb; /* 테두리 보라색 */
    // border-radius: px;
    margin-right: 6px;
    box-sizing: border-box;
  }

  input[type="checkbox"]:checked + &::before {
    background-color: #b39ddb; /* 체크 시 배경 보라색, 필요 없으면 제거 가능 */
  }
`;

export const SelectedWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
`;

export const SelectedItem = styled.div`
  background: #b39ddb;
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  margin: -3px 5px 8px 5px;
  font-size: 15px;
`;

export const RemoveButton = styled.span`
  margin-left: 6px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  &:hover {
    color: #f11111ff;
  }
`;
