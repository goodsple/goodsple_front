import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #444444; 
  padding: 12px 24px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box; 
`;

export const LogoImage = styled.img`
  height: 32px;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
  background-color: #F8FFC7; 
  color: #444444; 

  font-size: 14px; 
  font-weight: bold; 
  
  padding: 8px 16px;
  border: none;
  border-radius: 10px; 
  
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;