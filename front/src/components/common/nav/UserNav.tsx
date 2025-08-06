import { Link } from "react-router-dom";
import { ExtraBoldLink, ExtraBoldText, MenuLine, NavContainer, NavLinkItem, NavLinks, SubMenu, SubMenuItem } from "./UserNav.styles";
import { HamburgerButton } from "../header/HeaderStyle";
import { useState } from "react";


const UserNav = ({ onClose, menuOpen }: { onClose: () => void; menuOpen: boolean }) => {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <>
            {/* 닫기 버튼: 열렸을 때는 X 모양 */}
             {/* 메뉴가 열렸을 때만 닫기 버튼 렌더 */}
      {menuOpen && (
            <HamburgerButton $open={menuOpen} onClick={onClose} aria-label="메뉴 닫기">
                <span />
                <span />
                <span />
            </HamburgerButton>
      )}
            <NavContainer $open={menuOpen}>
                <NavLinks>
                <NavLinkItem
                    onClick={() => setShowSubMenu((prev) => !prev)}>
                    <ExtraBoldText>굿즈 카테고리</ExtraBoldText>
                    {showSubMenu && (
                        <SubMenu>
                            <SubMenuItem><Link to="/">K-POP</Link></SubMenuItem>
                            <SubMenuItem><Link to="/">애니메이션</Link></SubMenuItem>
                            <SubMenuItem><Link to="">영화</Link></SubMenuItem>
                            <SubMenuItem><Link to="/ ">게임</Link></SubMenuItem>
                            <SubMenuItem><Link to="/ ">기타</Link></SubMenuItem>
                        </SubMenu>
                    )}
                </NavLinkItem>
                <MenuLine />

                <NavLinkItem><ExtraBoldLink to="/">커뮤니티</ExtraBoldLink></NavLinkItem>
                <MenuLine />
                <NavLinkItem><ExtraBoldLink to="/">콘서트/행사 이벤트</ExtraBoldLink></NavLinkItem>
                <MenuLine />
                <NavLinkItem><ExtraBoldLink to="/">라이브 경매</ExtraBoldLink></NavLinkItem>
                <MenuLine />
                <NavLinkItem><ExtraBoldLink to="/">공지사항/소식</ExtraBoldLink></NavLinkItem>
                <MenuLine />
                <NavLinkItem><ExtraBoldLink to="/">지도</ExtraBoldLink></NavLinkItem>
                </NavLinks>
            </NavContainer>
        </>
    );
};
export default UserNav;