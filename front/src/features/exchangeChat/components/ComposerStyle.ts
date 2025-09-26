import styled from 'styled-components';

const COLORS = {
  primary: '#997BEB',
};

const RADIUS = {
  round: '999px',
};

export const Wrap = styled.div`
  display: grid; 
  grid-template-columns: 44px 1fr 92px;
  align-items: center; 
  gap: 10px;
  padding: 12px 14px;
`;

export const Attach = styled.button<{disabled?: boolean}>`
  width: 44px; 
  height: 44px; 
  border-radius: ${RADIUS.round};
  border: 1px solid ${COLORS.primary}; 
  background: #fff;
  font-size: 24px; 
  color: ${COLORS.primary};
  cursor: pointer; 
  opacity: ${({disabled}) => (disabled ? .5 : 1)};
`;

export const Input = styled.textarea<{disabled?: boolean}>`
  width: 100%; 
  padding: 14px 16px; 
  border-radius: ${RADIUS.round};
  border: 1.5px solid ${COLORS.primary}; 
  outline: none; 
  resize: none; 
  background: #fff;
  opacity: ${({disabled}) => (disabled ? .6 : 1)};
`;

export const Send = styled.button<{disabled?: boolean}>`
  height: 44px; 
  border-radius: ${RADIUS.round}; 
  border: 0;
  background: ${COLORS.primary}; 
  color: #fff; 
  font-weight: 700;
  cursor: pointer; 
  opacity: ${({disabled}) => (disabled ? .5 : 1)};
`;
