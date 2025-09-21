import styled from 'styled-components';

interface PopupWrapperProps {
  index: number; // 몇 번째 팝업인지
  total?: number; // 총 팝업 개수 (선택)
}

export const PopupWrapper = styled.div<PopupWrapperProps>`
  position: fixed;
  // top: 40%;
  top: ${({ index }) => 150 + index * 120}px; // index에 따라 아래로 120px씩 내려감
  left: 50%;
  // transform: translate(-50%, -50%);
  transform: translateX(-120%);
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  // z-index: 1000;
  z-index: ${({ index }) => 1000 + index}; // 겹칠 경우 index에 따라 z-index 조정
  transition: top 0.3s ease; // 위치 변경 시 자연스러운 이동
`;

export const PopupHeader = styled.div`
//   background: #f44336;
  color: #000;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #ddd;
`;

export const PopupContent = styled.div`
  padding: 20px;
  font-size: 16px;
  line-height: 1.4;
`;

export const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
`;

export const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;