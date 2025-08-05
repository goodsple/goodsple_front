import { useState } from "react";
import * as S from "./AdminNav.styles"
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
    { label: "대시보드", path: "/admin" },
    { label: "회원 관리", path: "/admin/users" },
    { label: "후기 관리", path: "/admin/reviews" },
    { label: "신고 관리", path: "/admin/reports" },
    { label: "이벤트존 관리", path: "/admin" },
    { label: "경매 관리", path: "/admin" },
    { label: "카테고리 관리", path: "/admin" },
    { label: "금칙어 필터링 관리", path: "/admin" },
    { label: "커뮤니티 관리", path: "/admin" },
    {
        label: "챗봇 관리",
        children: [
            { label: "챗봇 대화 로그 관리", path: "/admin" },
            { label: "챗봇 지식 베이스 관리", path: "/admin" },
        ]
    },
    { label: "실시간 검색어 관리", path: "/admin" },
    { label: "공지사항 관리", path: "/admin" },
];

const AdminNav = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<string>("대시보드");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleMenuClick = (label: string, path?: string) => {
        if (!path && openDropdown === label) {
            setOpenDropdown(null); // 토글 닫기
            return;
        }

        if (!path) {
            setOpenDropdown(label);
        } else {
            setActiveMenu(label);
            navigate(path);
        }
    };

    return (
        <S.NavContainer>
            <S.MenuList>
                {MENU_ITEMS.map((item) => (
                    <div key={item.label}>
                        <S.MenuItem
                            $active={activeMenu === item.label}
                            $isDashboard={item.label === "대시보드"}
                            onClick={() => handleMenuClick(item.label, item.path)}
                        >
                            {item.label}
                            {item.children && (
                                <S.DropdownArrow $open={openDropdown === item.label} />
                            )}
                        </S.MenuItem>
                        {/* 드롭다운 하위 메뉴 렌더링 */}
                        {item.children && openDropdown === item.label && (
                            <S.SubMenuList>
                                {item.children.map((child) => (
                                    <S.SubMenuItem
                                        key={child.label}
                                        onClick={() => handleMenuClick(child.label, child.path)}
                                        $active={activeMenu === child.label}
                                    >
                                        {child.label}
                                    </S.SubMenuItem>
                                ))}
                            </S.SubMenuList>
                        )}
                    </div>
                ))}
            </S.MenuList>
        </S.NavContainer>
    );
};

export default AdminNav;