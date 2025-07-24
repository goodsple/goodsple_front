import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const Content = styled.div`
  background-color: white;
  padding: 30px 40px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const Rule = styled.p`
  line-height: 1.6;
`;

export const CloseButton = styled.button`
  display: block;
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  border: none;
  background-color: #997BEB;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;