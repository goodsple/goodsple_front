import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
//   width: 30vw;
  width: 400px;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  padding-top: 100px;
  border-right: 1px solid #ddd;
`;

export const NavHeader = styled.div`
  position: fixed;       /* 헤더와 동일 위치에 고정 */
  top: 38px;            
  left: 16px;           
  width: 40px;           
  height: 24px;         
  z-index: 1100;         /* 메뉴 컨테이너(z-index:1000)보다 위 */
`;

export const HamburgerButton = styled.button<{ $open?: boolean }>`
  width: 40px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  span {
    height: 4px;
    background: #444;
    transition: 0.3s;
    transform-origin: center;
    border-radius: 2px;
  }

  ${({ $open }) =>
        $open &&
        `
    span:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  `}
`;

export const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 60px;
`;

export const NavLinkItem = styled.li`
  padding: 10px 45px;
  cursor: pointer;
  font-size: 24px;
  color: #444444;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;

export const SubMenu = styled.ul`
  list-style: none;
  padding-left: 32px;
  margin-top: 6px;
`;

export const SubMenuItem = styled.li`
  padding: 10px 0;
  font-size: 20px;
  color: #666;

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: #997BEB;
    }
  }
`;

export const ExtraBoldLink = styled(Link)`
font-weight: 800;
`;

export const ExtraBoldText = styled.span`
  font-weight: 800;
`;

export const MenuLine = styled.hr`
width: 80%;
border: none;
height: 1px;
background-color: #D9D9D9;
margin: 1px au;
`;