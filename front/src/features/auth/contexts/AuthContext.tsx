import { createContext, useContext, useEffect, useState } from "react";
import type { UserProfile } from "../types/\bauth";
import axiosInstance from "../../../api/axiosInstance";

// AuthContext에 저장할 값들의 타입 정의
interface AuthContextType {
    userProfile: UserProfile | null;  // 현재 로그인된 사용자 프로필 정보
    setUserProfile: (p: UserProfile|null) => void;  // 프로필 정보를 업데이트하는 함수
}

// Context 생성: 기본값은 null (Provider로 감싸지 않으면 오류 발생)
const AuthContext = createContext<AuthContextType|null>(null);


// AuthProvider 컴포넌트
// 앱 최상단에서 감싸면, 자식 컴포넌트들이 userProfile과 setUserProfile에 접근 가능

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [userProfile, setUserProfile] = useState<UserProfile|null>(null);

useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return; // 토큰 없으면 아무 것도 안 함
// 토큰이 있으면 백엔드에서 내 프로필을 한 번만 가져와서 Context에 저장
axiosInstance
    .get<UserProfile>("/auth/me")
    .then(res => {
    setUserProfile(res.data);
    })
    .catch(() => {
    // 실패 시(토큰 만료 등) Context 초기화
    setUserProfile(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    });
}, []);

return (
    <AuthContext.Provider value={{ userProfile, setUserProfile }}>
    {children}
    </AuthContext.Provider>
);
}

/**
 * useAuth 훅
 * - AuthContext를 사용하기 위한 커스텀 훅
 * - AuthProvider로 감싸지 않은 곳에서 호출하면 에러를 던짐
 */
export function useAuth() {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error('AuthProvider 필요');
return ctx;  // { userProfile, setUserProfile }를 반환
}