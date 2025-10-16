import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.png';
import defaultProfileImg from '../../../assets/images/default_profile.png';
import * as S from './AdminHeaderStyle';

type Props = {
  userPageUrl?: string;          // 사용자 화면 기본 진입 경로 (기본: '/')
  openUserPageInNewTab?: boolean; // 새 탭으로 열지 여부 (기본: true)
};

function AdminHeader({
  userPageUrl = '/',
  openUserPageInNewTab = true,
}: Props) {
  const navigate = useNavigate(); 
  
  const handleLogout = () => {  
    // 토큰/세션 데이터 전부 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.clear(); // 세션에 뭐 저장했다면 같이 지움

    // 로그인 화면으로 이동
    navigate('/login', { replace: true });
  };

  const goToUserView = () => {
    if (openUserPageInNewTab) {
      window.open(userPageUrl, '_blank');
    } else {
      navigate(userPageUrl);
    }
  };

  return (
    <S.HeaderContainer>
      <a href="/admin" aria-label="Admin Home">
        <S.LogoImage src={logoImg} alt="GoodsPle 로고" />
      </a>
      
      <S.ButtonGroup>
        <S.NavButton onClick={goToUserView}>사용자 화면</S.NavButton>
        <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
      </S.ButtonGroup>
    </S.HeaderContainer>
  );
}

export default AdminHeader;