import styled from 'styled-components';

const COLORS = {
  primary: '#997BEB',
};

const RADIUS = {
  round: '999px',
};

export const Wrap = styled.div`
    display: flex;               
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
`;

export const Attach = styled.button<{disabled?: boolean}>`
  width: 48px; 
  height: 40px; 
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
  padding: 11px 16px; 
  border-radius: ${RADIUS.round};
  border: 1.5px solid ${COLORS.primary}; 
  outline: none; 
  resize: none; 
  background: #fff;
  opacity: ${({disabled}) => (disabled ? .6 : 1)};
`;
