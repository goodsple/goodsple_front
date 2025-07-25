// 회원정보 타입
export interface UserProfile {
    loginId: string;
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;      
    gender: 'MALE' | 'FEMALE';
    profileImageUrl?: string; 
}