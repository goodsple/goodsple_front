export type FormDataType = {
    loginId: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
}
export type ErrorType = {
    loginId: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    name: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    agreements: string;
}
export type AgreementsType = {
    all: boolean;
    service: boolean;
    privacy: boolean;
    location: boolean;
    marketing: boolean;
}