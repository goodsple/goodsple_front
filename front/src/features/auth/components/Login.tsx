import * as s from './LoginStyle'
import LogoImg from '../../../assets/images/logo.png'
import KaKaoImg from '../../../assets/images/kakao_symbol.png'
import { useNavigate } from 'react-router-dom'

const Login:React.FC = () => {

    const navigate = useNavigate();

    return(
        <s.LoginContainer>
            <s.LoginWrap>
                <s.Logo>
                    <img src={LogoImg} alt="로고" />
                </s.Logo>
                <s.Form>
                    <s.Input 
                    type='text'
                    name='userId'
                    placeholder='아이디를 입력하세요'
                    />
                    <s.Input
                    type='password'
                    name='password'
                    placeholder='비밀번호를 입력하세요'
                    />
                   <s.LoginButton 
                    type="button" onClick={() => navigate('/')}>로그인</s.LoginButton>
                </s.Form>
                <s.LinkList>
                    <a onClick={()=> navigate('/findid')}>아이디 찾기</a>
                    <a onClick={()=> navigate('/findpwd')}>비밀번호 찾기</a>
                    <a onClick={()=> navigate('/signup')}>회원가입</a>
                </s.LinkList>
                <s.KakaoButton  type="button" onClick={() => navigate('/signup/kakao')}>
                    <img src={KaKaoImg} alt="카카오" />
                    카카오 로그인
                </s.KakaoButton>
            </s.LoginWrap>
        </s.LoginContainer>
    )
}
export default Login;