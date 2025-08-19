import styled from 'styled-components';

export const PopupWrapper = styled.div`
  position: fixed;
  top: 40%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  z-index: 1000;
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