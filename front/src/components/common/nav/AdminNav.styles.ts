import styled from "styled-components";

export const SidebarContainer = styled.nav`
  left: 0;
  width: 240px;
//   height: calc(100vh - 100px);
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
//   height: 60px;
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

