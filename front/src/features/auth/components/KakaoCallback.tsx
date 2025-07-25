import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../../../api/axiosInstance";
import type { UserProfile } from "../types/auth";

/**
 * 카카오 OAuth 콜백을 처리하는 전용 컴포넌트
 * 1) URL 쿼리에서 at, rt 토큰을 꺼내 localStorage에 저장
 * 2) 홈("/")으로 리다이렉트
 * 3) 화면에는 아무 UI도 렌더링하지 않음
 */
export default function KakaoCallback() {
     // useSearchParams로 URL 쿼리 파라미터 접근
    const [qp] = useSearchParams();
    // 리다이렉트에 사용할 navigate 함수
    const navigate = useNavigate();

    const { setUserProfile } = useAuth();
  
    useEffect(() => {
       // 1) 쿼리에서 토큰 꺼내기
      const at = qp.get('at');
      const rt = qp.get('rt');
 
      if (at && rt) {
        // localStorage에 저장
        localStorage.setItem('accessToken', at);
        localStorage.setItem('refreshToken', rt);
          // 프로필 fetch 후 Context에 저장
        axiosInstance.get<UserProfile>('/auth/me')
            .then(res => setUserProfile(res.data))
            .finally(() => navigate('/', { replace: true }));
      } else {
      // 토큰 처리 후 홈으로 이동
      navigate('/', { replace: true });
      }
    }, [qp, navigate, setUserProfile]);
  
     // 화면에는 아무것도 보여주지 않음
    return null; 
}