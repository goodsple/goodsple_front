
import * as style from './HeaderStyle';
import logoImg from '../../../assets/images/logo.png';
import chatImg from '../../../assets/images/chat.png';
import alarmImg from '../../../assets/images/alarm.png';
import profileImg from '../../../assets/images/default_profile.png';

import UserNav from '../nav/UserNav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [isOpen, setIsOpen] = useState(false); // 햄버거 버튼용
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴바 전용

  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userProfileImg, setUserProfileImg] = useState<string | null>(null);

  const navigate = useNavigate();

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
                  <img src={alarmImg} alt="알림" />
                </style.IconBox>


                <style.ProfileWrapper isDefault={!userProfileImg}>
                  {userProfileImg ? (
                    <style.ProfileIcon src={userProfileImg} alt="업로드된 프로필 이미지" />
                  ):(
                    <style.ProfileIcon src={profileImg} alt="기본 프로필 이미지" isDefault />
                  )}
                </style.ProfileWrapper>
                <style.LogoutButton onClick={()=>{
                  setIsLoggedin(false)
                  navigate('/');
                  }}>로그아웃</style.LogoutButton>
              </>
            ) : (
              <>
                <style.SignupButton onClick={()=>navigate('/signup')}>회원가입</style.SignupButton>
                <style.LoginButton onClick={()=>navigate('/login')}>로그인</style.LoginButton>
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