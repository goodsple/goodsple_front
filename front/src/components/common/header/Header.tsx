
import * as style from './HeaderStyle';
import logoImg from '../../../assets/images/logo.png';
import chatImg from '../../../assets/images/chat.png';
import alarmImg from '../../../assets/images/alarm.png';
import profileImg from '../../../assets/images/default_profile.png';
import UserNav from '../nav/UserNav';
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false); // 햄버거 버튼용
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴바 전용

  const [isLoggedIn, setIsLoggedin] = useState(false);


  return (
    <>
      <style.HeaderContainer>
        <style.HeaderInner>
          <style.LeftArea>
          <style.HamburgerButton onClick={() => { setIsOpen(!isOpen); setMenuOpen(!menuOpen); }} $open={isOpen}>
              <span />
              <span />
              <span />
            </style.HamburgerButton>
          </style.LeftArea>

          <style.CenterArea>
            <style.Logo src={logoImg} alt="GoodsPle 로고" />
          </style.CenterArea>

          <style.RightArea>
            {isLoggedIn ? (
              <>
                <style.IconBox iconType="chat">
                  <img src={chatImg} alt="채팅" />
                </style.IconBox>

                <style.IconBox iconType="alarm">
                  <img src={alarmImg} alt="알림" />
                </style.IconBox>
                <style.ProfileWrapper>
                  <style.ProfileIcon src={profileImg} alt="기본 프로필" />
                </style.ProfileWrapper>
                <style.LogoutButton>로그아웃</style.LogoutButton>
              </>
            ) : (
              <>
                <style.SignupButton>회원가입</style.SignupButton>
                <style.LoginButton>로그인</style.LoginButton>
              </>
            )}
          </style.RightArea>
        </style.HeaderInner>

      </style.HeaderContainer>

      {menuOpen && (
        <>
          <UserNav onClose={() => { setIsOpen(false); setMenuOpen(false); } } menuOpen={menuOpen}  />
          <style.Overlay onClick={() => { setIsOpen(false); setMenuOpen(false); }} />
        </>
      )}
    </>
  );
}

export default Header;