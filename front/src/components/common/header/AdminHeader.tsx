import logoImg from '../../../assets/images/logo.png';
import * as S from './AdminHeaderStyle';

function AdminHeader() {
  
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
  };

  return (
    <S.HeaderContainer>
      <a href="/admin">
        <S.LogoImage src={logoImg} alt="GoodsPle 로고" />
      </a>
      
      <S.LogoutButton onClick={handleLogout}>
        로그아웃
      </S.LogoutButton>
    </S.HeaderContainer>
  );
}

export default AdminHeader;