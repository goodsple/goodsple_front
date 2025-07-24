type KakaoFormDataType = {
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    kakaoId: string,
};

type KakaoErrorType = {
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    agreements?: string; 
};

// UI 검증용 에러 상태에는 kakaoId가 필요 없으므로 생략
export type KakaoErrorType = Omit<KakaoFormDataType, 'kakaoId'>

type DupResultType = {
    nickname: string;
    nicknameValue: string;
    phoneNumber: string;
    phoneNumberValue: string;
};

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}