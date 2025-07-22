import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.png';
import * as S from './AdminHeaderStyle';

function AdminHeader() {
  const navigate = useNavigate(); 
  
  const handleLogout = () => {  
    navigate('/'); 
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