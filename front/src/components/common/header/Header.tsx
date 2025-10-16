import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../nav/UserNav';
import { useAuth } from '../../../features/auth/contexts/AuthContext';

import * as style from './HeaderStyle';
import logoImg from '../../../assets/images/logo.png';
import chatImg from '../../../assets/images/chat.png';
import alarmImg from '../../../assets/images/alarm.png';
import profileImg from '../../../assets/images/default_profile.png';


function Header() {
  const navigate = useNavigate();

  // 햄버거 메뉴 & 로그인 여부
  // const [isOpen, setIsOpen] = useState(false); // 햄버거 버튼용
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴바 전용

  // Context에서 가져온 userProfile
  const { userProfile, setUserProfile } = useAuth();
  const isLoggedIn = Boolean(userProfile);

  // 로그아웃: Context만 초기화
  const handleLogout = useCallback(() => {
    //  토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 2) 카카오 SDK 세션 로그아웃
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 SDK 세션 해제 완료');
      });
    }

     // 3) Context 초기화, 화면 이동
    setUserProfile(null);
    navigate('/login');
  }, [navigate, setUserProfile]);


  return (
    <>
      <style.HeaderContainer>
        <style.HeaderInner>
          <style.LeftArea>
          <style.HamburgerButton 
            $open={menuOpen}
            onClick={() => setMenuOpen(prevOpen => !prevOpen)}
            aria-label="메뉴 토글">
              <span />
              <span />
              <span />
            </style.HamburgerButton>
          </style.LeftArea>

          <style.CenterArea onClick={()=>{navigate('/')}}>
            <style.Logo src={logoImg} alt="GoodsPle 로고" />
          </style.CenterArea>

          <style.RightArea>
            {isLoggedIn && userProfile ? (
              <>
                <style.IconBox $iconType="chat"
                onClick={() => navigate('/exchange-chat')} 
                >
                  <img src={chatImg} alt="채팅" />
                </style.IconBox>

                <style.IconBox $iconType="alarm">
                  <img src={alarmImg} alt="알림" />
                </style.IconBox>


                <style.ProfileWrapper 
                  $isDefault={!userProfile?.profileImageUrl}
                  onClick={()=> navigate('/mypage')}
                >
                {userProfile?.profileImageUrl ? (
                    <style.ProfileIcon 
                      src={userProfile.profileImageUrl} 
                      alt="업로드된 프로필 이미지" />
                ):(
                    <style.ProfileIcon 
                      src={profileImg} 
                      alt="기본 프로필 이미지" $isDefault
                    />
                )}
                </style.ProfileWrapper>
                <style.LogoutButton onClick={handleLogout}>로그아웃</style.LogoutButton>
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

       {/* 항상 렌더링하되, CSS transform/opacity 만 토글 */}
       <UserNav 
        menuOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />
      <style.Overlay 
        $open={menuOpen} 
        onClick={() => setMenuOpen(false)} 
      />
    </>
  );
}

export default Header;