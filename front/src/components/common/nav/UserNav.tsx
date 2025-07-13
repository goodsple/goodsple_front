import { Link } from "react-router-dom";
import { ExtraBoldLink, ExtraBoldText, HamburgerButton, MenuLine, NavContainer, NavHeader, NavLinkItem, NavLinks, SubMenu, SubMenuItem } from "./UserNav.styles";
import { useState } from "react";


const UserNav = ({ onClose }: { onClose: () => void }) => {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <NavContainer>
            <NavHeader>
                {/* 닫기 버튼: 열렸을 때는 X 모양 */}
                <HamburgerButton $open={true} onClick={onClose} aria-label="메뉴 닫기">
                    <span />
                    <span />
                    <span />
                </HamburgerButton>
            </NavHeader>

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
    );
};
export default UserNav;