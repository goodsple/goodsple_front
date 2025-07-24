import * as s from './LoginStyle'
import LogoImg from '../../../assets/images/logo.png'
import KaKaoImg from '../../../assets/images/kakao_symbol.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../../../api/axiosInstance'
import type {LoginFormType} from '../types/login'
        
import { useAuth } from '../contexts/AuthContext'; 
import type { UserProfile } from '../types/\bauth'


const Login:React.FC = () => {

    const [formData, setFormData] = useState<LoginFormType>({
        loginId: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();
    const { setUserProfile } = useAuth();  

    const handleLogin = async() => {

        if (!formData.loginId || !formData.password) {
            setErrorMessage("❗아이디와 비밀번호를 모두 입력해 주세요.");
            return;
        }

        try{
             // 1) 로컬 로그인 요청
            const res = await axiosInstance.post("/auth/login",{
                loginId : formData.loginId,
                password : formData.password
            });

            // 2) 받은 토큰을 저장
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            // 3) 로그인 직후 프로필 정보 가져오기
            const profileRes = await axiosInstance.get<UserProfile>('/auth/me');
            setUserProfile(profileRes.data);                     // 4) Context 업데이트

            // 5) 홈으로 이동
            navigate("/");
        }catch (err: any) {
            // 에러 처리
            if (err.response?.status === 401) {
              setErrorMessage(err.response?.data?.message || "❗아이디 또는 비밀번호가 일치하지 않습니다.");
            } else if (err.response?.status === 403) {
              setErrorMessage(err.response?.data?.message || "❗접근 권한이 없습니다.");
            } else {
              setErrorMessage("❗로그인 중 오류가 발생했습니다.");
            }
          }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    const handleKakaoLogin = async() => {
        try{
            const res = await axiosInstance.get("/auth/kakao/url");
            window.location.href = res.data.url;
        }catch(err:any){
            alert("카카오 로그인 연결 중 오류가 발생했습니다.");
        }
    }

    return(
        <s.LoginContainer>
            <s.LoginWrap>
                <s.Logo>
                    <img src={LogoImg} alt="로고" />
                </s.Logo>
                <s.Form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                    }}>
                    <s.Input 
                    type='text'
                    name='loginId'
                    value={formData.loginId}
                    placeholder='아이디를 입력하세요'
                    onChange={handleChange}
                    />
                    <s.Input
                    type='password'
                    name='password'
                    value={formData.password}
                    placeholder='비밀번호를 입력하세요'
                    onChange={handleChange}
                    />
                    {errorMessage && <s.ErrorText>{errorMessage}</s.ErrorText>}
                   <s.LoginButton 
                    type="submit">로그인</s.LoginButton>
                     
                </s.Form>
                <s.LinkList>
                    <Link to="/findid" >아이디 찾기</Link>
                    <Link to="/findpwd" >비밀번호 찾기</Link>
                    <Link to="/signup" >회원가입</Link>
                </s.LinkList>
                <s.KakaoButton type="button" onClick={handleKakaoLogin}>
                    <img src={KaKaoImg} alt="카카오" />
                    카카오 로그인
                </s.KakaoButton>
            </s.LoginWrap>
        </s.LoginContainer>
    )
}
export default Login;