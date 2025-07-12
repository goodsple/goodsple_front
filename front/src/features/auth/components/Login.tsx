import * as s from './LoginStyle'
import LogoImg from '../../../assets/images/logo.png'
import KaKaoImg from '../../../assets/images/kakao_symbol.png'

const Login:React.FC = () => {

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
                   <s.LoginButton type='submit'>로그인</s.LoginButton>
                </s.Form>
                <s.LinkList>
                    <a href="#">아이디 찾기</a>
                    <a href="#">비밀번호 찾기</a>
                    <a href="#">회원가입</a>
                </s.LinkList>
                <s.KakaoButton>
                    <img src={KaKaoImg} alt="카카오" />
                    카카오 로그인
                </s.KakaoButton>
            </s.LoginWrap>
        </s.LoginContainer>
    )
}
export default Login;