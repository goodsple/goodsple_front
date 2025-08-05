
export type EditProfileFormDataType = {
    loginId: string;
    name: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: 'male' | 'female' | ''; // ""도 허용 (초기값)
    profileImageUrl: string;
    currentPassword: string;
    newPassword: string;
    newPasswordCheck: string;
    loginType: 'LOCAL' | 'KAKAO' | ''; // ""도 초기값 가능
};

export type EditProfileErrorType = {
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    currentPassword: string;
    newPassword: string;
    newPasswordCheck: string;
};

export type CheckResultType = {
    nickname: string;
    nicknameValue: string;
    email: string;
    emailValue: string;
    phoneNumber: string;
    phoneNumberValue: string;
};