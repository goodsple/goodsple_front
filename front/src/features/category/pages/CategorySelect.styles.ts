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

/* ✅ 수정된 체크박스 부분 */
export const CheckboxLabel = styled.label`
  width: 33.33%;
  box-sizing: border-box;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  height: 28px;
  position: relative;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1.5px solid #b39ddb;
    border-radius: 4px;
    margin-right: 6px;
    cursor: pointer;
    position: relative;
    background-color: white;
    transition: all 0.2s ease;
  }

  /* ✅ 체크되었을 때 표시 */
  input[type="checkbox"]:checked {
    background-color: #b39ddb;
    border-color: #b39ddb;
  }

  /* ✅ 체크표시(✔) 추가 */
  input[type="checkbox"]:checked::after {
    // content: "V";
    color: white;
    font-size: 12px;
    position: absolute;
    top: 0px;
    left: 3px;
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
