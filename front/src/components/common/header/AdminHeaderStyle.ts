import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #444444; 
  padding: 12px 24px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box; 

  height: 100px;
`;

export const LogoImage = styled.img`
  height: 68px;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
  background-color: #F8FFC7; 
  color: #444444; 

  font-size: 14px; 
  font-weight: bold; 
  
  padding: 8px 16px;
  border: none;
  border-radius: 5px; 
  
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

// export const MainContent = styled.main`
//   padding-top: 100px; 
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

export const MainContent = styled.main`
  padding-top: 100px; 
  padding-left: 40px;
  padding-right: 40px;
  background-color: #FFFDFA;
  width: 100%;
  min-height: calc(100vh - 100px);
  box-sizing: border-box;
`;