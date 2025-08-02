// 회원정보 타입
export interface UserProfile {
    userId: number;   
    loginId: string;
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;      
    gender: 'MALE' | 'FEMALE';
    profileImageUrl?: string; 
    role: string;
}

/**
 * 로그인 API 호출 시 반환되는 타입
 */
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userProfile: UserProfile;
}