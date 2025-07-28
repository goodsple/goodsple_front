import styled from "styled-components";

export const NavContainer = styled.nav`
  left: 0;
  width: 260px;
  background-color: #fff;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled.li<{ $active: boolean; $isDashboard?: boolean }>`
height: ${({ $isDashboard }) => ($isDashboard ? "100px" : "60px")};
  // height: 60px;
  display: flex;
  align-items: center;
  justify-content: center; 
  font-size: 16px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  background-color: ${({ $active }) => ($active ? "#997BEB" : "transparent")};
  color: ${({ $active }) => ($active ? "#FFFFFF" : "#444")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "#997BEB" : "#f6f6f6")};
  }
`;

export const SubMenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    background-color: #fafafa;
`;

export const SubMenuItem = styled.li<{ $active?: boolean }>`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    background-color: ${({ $active }) => ($active ? "#997BEB" : "#CCC")};
    cursor: pointer;
    font-size: 14px;
    // font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    color: ${({ $active }) => ($active ? "#FFFFFF" : "#444")};

    &:hover {
        background-color: #997BEB;
    }
`;

export const DropdownArrow = styled.span<{ $open: boolean }>`
  display: inline-block;
  margin-left: 8px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: ${({ $open }) => ($open ? "none" : "6px solid #444")};
  border-bottom: ${({ $open }) => ($open ? "6px solid #444" : "none")};
  transition: transform 0.2s ease;
`;
