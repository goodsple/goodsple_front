import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 600px; max-width: 90%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  display: flex; flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  position: relative;
  padding: 20px 25px 20px 30px;

  h3 {
    margin: 0;
    font-size: 20px;
    text-align: center;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  column-gap: 24px;
  padding: 24px 30px;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  width: 100px;
  font-weight: 500;
  white-space: nowrap;
`;

export const Value = styled.div`
  flex: 1;
  color: #333;
`;

export const Select = styled.select`
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
`;

export const SaveButton = styled.button`
  padding: 12px 60px;
  background: ${({ disabled }) => (disabled ? '#D9D9D9' : '#997BEB')};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
