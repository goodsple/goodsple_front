import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.nav<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(${({ $open }) => ($open ? '0' : '-400px')});
  width: 450px;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  padding-top: 100px;
  border-right: 1px solid #ddd;
  transition: transform 0.3s ease;
  overflow-y: auto;
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
  padding: 15px 60px;
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
margin: 1px auto;
`;