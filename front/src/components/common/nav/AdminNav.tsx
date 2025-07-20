import { useState } from "react";
import * as S from "./AdminNav.styles"
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
    { label: "대시보드", path: "/admin" },
    { label: "회원 관리", path: "/admin" },
    { label: "후기 관리", path: "/admin" },
    { label: "신고 관리", path: "/admin" },
    { label: "이벤트존 관리", path: "/admin" },
    { label: "경매 관리", path: "/admin" },
    { label: "카테고리 관리", path: "/admin" },
    { label: "금칙어 필터링 관리", path: "/admin" },
    { label: "커뮤니티 관리", path: "/admin" },
    { label: "챗봇 관리", path: "/admin" },
    { label: "실시간 검색어 관리", path: "/admin" },
    { label: "공지사항 관리", path: "/admin" },
];

const AdminNav = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<string>("대시보드");

    const handleMenuClick = (label: string, path: string) => {
        setActiveMenu(label);
        navigate(path);
    };

    return (
        <S.SidebarContainer>
            <S.MenuList>
                {MENU_ITEMS.map(({ label, path }) => (
                    <S.MenuItem
                        key={label}
                        $active={activeMenu === label}
                        $isDashboard={label === "대시보드"}
                        onClick={() => handleMenuClick(label, path)}
                    >
                        {label}
                    </S.MenuItem>
                ))}
            </S.MenuList>
        </S.SidebarContainer >
    );
};

export default AdminNav;