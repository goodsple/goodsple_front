import * as ep from './EditProfileStyle';
import * as s from '../../auth/components/SignUpStyle';

import profileImg from '../../../assets/images/default_profile.png'
import arrowImg from '../../../assets/images/arrow_right.png'

import { useEffect, useState } from 'react';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import type { CheckResultType, EditProfileErrorType, EditProfileFormDataType } from '../types/editProfile';

const EditProfile:React.FC = () => {

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState<EditProfileFormDataType | null>(null);

    const [isPhoneEditable, setIsPhoneEditable] = useState(false); // 휴대폰번호 변경 여부
    const [isPasswordOpen, setIsPasswordOpen] = useState(false); // 비밀번호 변경 토글 여부

    const [userProfileImg, setUserProfileImg] = useState<string | null>(null); // 미리보기용
    const [uploadImageFile, setUploadImageFile] = useState<File | null>(null); // 전송용

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  // 모달 여부
    const [confirmType, setConfirmType] = useState<'save'|'withdraw'|null>(null);  // 모달 타입 (저장, 탈퇴)
    const [isResultOpen, setIsResultOpen] = useState(false); // 확인 시 나오는 모달
    const [resultMessage, setResultMessage] = useState(''); // 결과 메시지
    
    const [formData, setFormData] = useState<EditProfileFormDataType>({
        loginId: "",            // 읽기 전용
        name: "",               // 수정 가능
        nickname: "",           // 수정 가능
        email: "",              // 로컬만 수정 가능
        phoneNumber: "",        // 변경 버튼 눌렀을 때만 수정 가능
        birthDate: "",          // 읽기 전용
        gender: "",             // 읽기 전용 ("male" | "female")
      
        profileImageUrl: "",    // 프로필 이미지 업로드 시
        currentPassword: "",    // 비밀번호 변경 시 기존 비밀번호
        newPassword: "",        // 새 비밀번호
        newPasswordCheck: "",   // 새 비밀번호 확인
      
        loginType: "",          // "LOCAL" | "KAKAO" → 조건 분기용
    });

    const isKakaoUser = formData.loginType === 'KAKAO';

    const [errors, setErrors] = useState<EditProfileErrorType>({
        nickname: '',
        name: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        newPasswordCheck: '',
    });

    const [checkResult, setCheckResult] = useState<CheckResultType>({
        nickname: '',
        nicknameValue: '',
        email: '',
        emailValue: '',
        phoneNumber: '',
        phoneNumberValue: '',
    });


    // 페이지 접속 시 유저 정보 가져오기
    useEffect(() => {
    const fetchUser = async () => {
        const res = await axiosInstance.get('/users/me/profile');
        const user = res.data;

        const userData: EditProfileFormDataType = {
            loginId: user.loginId,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            gender: user.gender.toLowerCase(),
            profileImageUrl: user.profileImageUrl ?? '',
            currentPassword: '',
            newPassword: '',
            newPasswordCheck: '',
            loginType: user.loginType,
          };
          setFormData(userData);
          setInitialData(userData); // 원본 데이터 저장
        };

    fetchUser();
    }, []);

   
    const isChanged = () => {
        if (!initialData) return false;
      
        // 1) 이미지 교체만 해도 활성화
        if (uploadImageFile) return true;

         // 2) 비밀번호 변경 모드이고, 세 칸 모두 빈 값이 아니면 활성화
        if (
            isPasswordOpen &&
            formData.currentPassword.trim() !== '' &&
            formData.newPassword.trim() !== '' &&
            formData.newPasswordCheck.trim() !== '' &&
            formData.currentPassword !== formData.newPassword  
        ) {
            return true;
        }
      
        // 3) 기본 정보 중 하나라도 다르면 활성화
        if (formData.name !== initialData.name)      return true;
        if (formData.nickname !== initialData.nickname) return true;
        if (!isKakaoUser && formData.email !== initialData.email) return true;
        if (isPhoneEditable && formData.phoneNumber !== initialData.phoneNumber) return true;
      
        // 그 외에는 변경된 게 없음
        return false;
    };
      

    // 프로필 이미지 업로드 시
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 사용자가 선택한 파일을 가져옴 (단일 파일만 허용)
        const file = e.target.files?.[0];

        // 사용자가 파일을 선택하지 않았을 경우 함수 종료
        if (!file) return;
      
        // 실제 서버 전송용 파일 상태에 저장 (백엔드에 보낼 용도)
        setUploadImageFile(file); 
      
        // 이미지 미리보기를 위한 FileReader 사용
        const reader = new FileReader();

        // 파일 읽기가 끝났을 때 실행되는 콜백 함수
        reader.onloadend = () => {

            // 읽은 결과를 string URL로 변환해서 미리보기용 상태에 저장
            setUserProfileImg(reader.result as string); // 미리보기용 URL 저장
        };
        // 파일을 base64 형식의 Data URL로 읽음 (브라우저에서 미리보기 가능하게 만듦)
        reader.readAsDataURL(file);
    };

    // 입력값 변경할 때
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setFormData(prev => ({ ...prev, [name]: value }));

         // 공통 정규표현식
        const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01[0-9]{8,9}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

        // 유효성 검사 메시지
        let errorMsg = '';

        switch (name) {
            case 'name':
            errorMsg = value.trim()
                ? nameRegex.test(value)
                ? ''
                : '이름은 한글 또는 영문으로 입력해 주세요.'
                : '이름을 입력해주세요.';
            break;
            case 'nickname':
            errorMsg = value.trim()
                ? nicknameRegex.test(value)
                ? ''
                : '닉네임은 한글, 영문, 숫자만 사용할 수 있으며 2~20자 이내여야 합니다.'
                : '닉네임을 입력해주세요.';
            break;
            case 'email':
            if (!isKakaoUser) {
                errorMsg = value.trim()
                ? emailRegex.test(value)
                    ? ''
                    : '올바른 이메일 형식이 아닙니다.'
                : '이메일을 입력해주세요.';
            }
            break;
            case 'phoneNumber':
            if (isPhoneEditable) {
                errorMsg = value.trim()
                ? phoneRegex.test(value)
                    ? ''
                    : '올바른 휴대폰 번호 형식이어야 합니다.'
                : '휴대폰 번호를 입력해주세요.';
            }
            break;
            case 'newPassword':
            errorMsg = isPasswordOpen
                ? passwordRegex.test(value)
                ? ''
                : '영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.'
                : '';
            break;
            case 'newPasswordCheck':
            errorMsg = isPasswordOpen && value !== formData.newPassword
                ? '새 비밀번호가 일치하지 않습니다.'
                : '';
            break;
            case 'currentPassword':
            errorMsg = isPasswordOpen && !value
                ? '현재 비밀번호를 입력해주세요.'
                : '';
            break;

            default:
            break;
        }
            // 에러 상태 갱신
            setErrors((prev) => ({ ...prev, [name]: errorMsg }));
       
        // 중복 확인 초기화
        if (['nickname', 'email', 'phoneNumber'].includes(name)) {
            setCheckResult(prev => ({
            ...prev,
            [name]: '',
            [`${name}Value`]: '', 
            }));
        }
    };

    // 중복 체크할 때
    const checkDuplicate = async (type: 'nickname' | 'email' | 'phoneNumber') => {
        const value = formData[type];

         // 공백 입력 시 에러 메시지 출력
        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [type]: `${type === 'nickname' ? '닉네임' : type === 'email' ? '이메일' : '휴대폰 번호'}을(를) 입력해주세요.`,
            }));
            return;
        }
      
        try {
            const typeMap = {
                nickname: 'NICKNAME',
                email: 'EMAIL',
                phoneNumber: 'PHONE_NUMBER',
            } as const;
          
            const res = await axiosInstance.get(`/auth/check?type=${typeMap[type]}&value=${value}`);
      
          if (res.data.available) {
            // 사용 가능: 에러 메시지 제거, 성공 메시지 표시
            setErrors(prev => ({
              ...prev,
              [type]: '',
            }));
            setCheckResult(prev => ({
                ...prev,
                [type]: `사용 가능한 ${type === 'nickname' ? '닉네임' : type === 'email' ? '이메일' : '휴대폰 번호'}입니다.`,
                [`${type}Value`]: value,
              }));
          } else {
            // 사용 불가
            setErrors(prev => ({
                ...prev,
                [type]: `이미 사용 중인 ${type === 'nickname' ? '닉네임' : type === 'email' ? '이메일' : '휴대폰 번호'}입니다.`,
            }));
              setCheckResult(prev => ({
                ...prev,
                [type]: '',
                [`${type}Value`]: '',
            }));
          }
        } catch (error) {
          console.error('중복 확인 실패:', error);
          setErrors(prev => ({
            ...prev,
            [type]: '중복 확인 중 오류가 발생했습니다.',
          }));
          setCheckResult(prev => ({
            ...prev,
            [type]: '',
            [`${type}Value`]: value,
          }));
        }
    };

    // 저장할 때
    const handleSave = async () => {
        if (!initialData) return;   // 원본데이터가 변경되지 않으면 

        let hasError = false;   // 유효성 검사 결과를 저장하는 플래그
        let profileImageUrl = null;  // 프로필 이미지 주소

        // 정규표현식
        const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01[0-9]{8,9}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

        // 1) 클라이언트 단에서 바로 체크: 현재 비번 === 새 비번
        if (isPasswordOpen &&
            formData.currentPassword.trim() !== '' &&
            formData.newPassword.trim() !== '' &&
            formData.currentPassword === formData.newPassword
        ) {
             setErrors(prev => ({
            ...prev,
            newPassword: '현재 비밀번호와 새로운 비밀번호가 동일합니다.',
            // 필요하다면 currentPassword나 newPasswordCheck 에러도 초기화
            currentPassword: '',
            newPasswordCheck: ''
          }));
          return;
        }
        // 에러 상태 초기화 + 유효성 검사
        const newErrors: EditProfileErrorType = {
            name: formData.name.trim()
            ? formData.name.match(nameRegex)
                ? ''
                : '이름은 한글 또는 영문으로 입력해 주세요.'
            : '이름을 입력해주세요.',
        
            nickname: formData.nickname.trim()
            ? formData.nickname.match(nicknameRegex)
                ? ''
                : '닉네임에는 특수문자를 사용할 수 없습니다.'
            : '닉네임을 입력해주세요.',
        
            email: !isKakaoUser
            ? formData.email.trim()
                ? formData.email.match(emailRegex)
                ? ''
                : '올바른 이메일 형식이 아닙니다.'
                : '이메일을 입력해주세요.'
            : '',
        
            phoneNumber: isPhoneEditable
            ? formData.phoneNumber.trim()
                ? formData.phoneNumber.match(phoneRegex)
                ? ''
                : '올바른 휴대폰 번호 형식이어야 합니다.'
                : '휴대폰 번호를 입력해주세요.'
            : '',
        
            currentPassword: isPasswordOpen && !formData.currentPassword
            ? '현재 비밀번호를 입력해주세요.'
            : '',
        
            newPassword: isPasswordOpen
            ? !formData.newPassword.match(passwordRegex)
                ? '영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.'
                : ''
            : '',
        
            newPasswordCheck: isPasswordOpen && formData.newPassword !== formData.newPasswordCheck
            ? '새 비밀번호가 일치하지 않습니다.'
            : '',
        };

        // 중복확인 여부 검사
        if (
            formData.nickname &&
            formData.nickname !== initialData.nickname && // 기존 값과 다를 때만 체크
            (checkResult.nickname !== '사용 가능한 닉네임입니다.' ||
            formData.nickname !== checkResult.nicknameValue)
        ) {
            newErrors.nickname = '닉네임 중복 확인이 필요합니다.';
            hasError = true;
        }
        
        if (
            !formData.loginType.includes('KAKAO') &&
            formData.email &&
            formData.email !== initialData.email && // 기존 값과 다를 때만 체크
            (checkResult.email !== '사용 가능한 이메일입니다.' ||
            formData.email !== checkResult.emailValue)
        ) {
            newErrors.email = '이메일 중복 확인이 필요합니다.';
            hasError = true;
        }
        
        if (
            isPhoneEditable &&
            formData.phoneNumber &&
            formData.phoneNumber !== initialData.phoneNumber && // 기존 값과 다를 때만 체크
            (checkResult.phoneNumber !== '사용 가능한 휴대폰 번호입니다.' ||
            formData.phoneNumber !== checkResult.phoneNumberValue)
        ) {
            newErrors.phoneNumber = '휴대폰 번호 중복 확인이 필요합니다.';
            hasError = true;
        }
           
        setErrors(newErrors); // 항상 최신 상태 반영

         // 최종 에러 확인
        hasError = hasError || Object.values(newErrors).some((msg) => msg);
        if (hasError) return;

        // 이미지 업로드 (있는 경우만)
        if (uploadImageFile) {
            try{
                 // 1. 이미지 파일을 FormData로 감싼다
                const imageFormData = new FormData();
                imageFormData.append('file', uploadImageFile);
            
                // 2. 업로드 API 호출
                const response = await axiosInstance.post('/upload/profile', imageFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                });
            
                // 3. 서버가 응답한 이미지 URL 저장
                profileImageUrl = response.data.url;
            }catch (err) {
            console.error('이미지 업로드 실패:', err);
            setResultMessage('이미지 업로드 중 오류가 발생했습니다.');
            setIsResultOpen(true);
            return;
          }
        }
        let config: any;    // axios 요청 시 함께 전달되는 헤더 설정 객체

         // 최종 payload 구성
        const payload: any = {  // 서버에 보낼 요청 데이터를 담는 객체
            name: formData.name,
            nickname: formData.nickname,
            email: !isKakaoUser ? formData.email : undefined,
            phoneNumber: isPhoneEditable ? formData.phoneNumber : undefined,
            currentPassword: isPasswordOpen ? formData.currentPassword : undefined,
            newPassword: isPasswordOpen ? formData.newPassword : undefined,
            profileImageUrl: profileImageUrl || formData.profileImageUrl || undefined,
        };

        // undefined 값 제거
        Object.keys(payload).forEach((key) => {
            if (payload[key] === undefined || payload[key] === '') {
            delete payload[key];
            }
        });

        // 5. PUT 요청 전송
        try {
            // 서버에 PATCH 요청 (내 정보 수정)
            await axiosInstance.put('/users/me', payload, config);

            // 성공 시 결과 메시지 설정
            setResultMessage('회원정보가 저장되었습니다.');
        } catch (err:any) {
            setResultMessage(err.response?.data?.message ?? '저장 중 오류가 발생했습니다.');
        } finally {
            // 성공/실패와 관계없이 결과 모달 열기
            setIsResultOpen(true);
        }
    };

    // 회원 탈퇴할 때
    const handleWithdraw = async () => {
        try {
            // DELETE /api/users/me 호출
            await axiosInstance.delete('/users/me');
            
            // 로컬 스토리지/쿠키에서 토큰 제거
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // (쿠키로 저장했다면 document.cookie = '...' 형식으로 삭제)
      
          } catch (err) {
            console.error('회원 탈퇴 실패', err);
            alert('회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
    };

    return (
        <ep.EditProfileContainer>
            <s.SignUpWrap>
            <s.SignUpTitle>회원정보 수정</s.SignUpTitle>

                <ep.ProfileImageWrap>
                <ep.ProfileImage isDefault={!userProfileImg && !formData.profileImageUrl}>
                    {/* {userProfileImg ?(
                         <img src={userProfileImg} alt="업로드된 프로필 이미지" />
                    ):(
                        <img src={profileImg} alt="기본 프로필 이미지" />
                    )} */}
                    <img
                        src={userProfileImg || formData.profileImageUrl || profileImg}
                        alt="프로필 이미지"
                    />
                </ep.ProfileImage>
                <label htmlFor="profileImage">
                    <ep.UploadButton as="span">이미지 업로드</ep.UploadButton>
                    <ep.HiddenFileInput 
                        type="file" 
                        id="profileImage"  
                        className="hiddenFileInput" 
                        accept="image/*"
                        onChange={handleImageChange} />
                </label>
                </ep.ProfileImageWrap>

                <s.SignUpForm onSubmit={(e) => e.preventDefault()}>
                <s.SignUpLi>닉네임</s.SignUpLi>
                <s.InputRow>
                    <s.SignUpInput 
                        type="text" 
                        name="nickname" 
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="닉네임을 입력해주세요." />
                    <s.SignUpDupli 
                        type='button'
                        className={
                        formData.nickname === checkResult.nicknameValue &&
                        !errors.nickname &&
                        checkResult.nicknameValue !== ''
                            ? 'active'
                            : ''
                        }
                        onClick={() => checkDuplicate('nickname')}>중복 확인</s.SignUpDupli>
                </s.InputRow>
                {errors.nickname && <s.ErrorMessage>❗{errors.nickname}</s.ErrorMessage>}
                
                {checkResult.nickname && !errors.nickname && (
                    <s.CheckMessage>{checkResult.nickname}</s.CheckMessage>
                )}

                <s.SignUpLi>아이디</s.SignUpLi>
                <s.InputRow>
                    <ep.ReadOnlyInput 
                        type="text" 
                        value={formData.loginId}
                        readOnly />
                </s.InputRow>

                <ep.PasswordToggleButton type="button" onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                    <span>비밀번호 변경</span>
                    <img src={arrowImg} alt="화살표" className={isPasswordOpen ? 'rotate-up' : 'rotate-down'} />
                </ep.PasswordToggleButton>

                {isPasswordOpen && (
                    <ep.PasswordForm>
                        <s.SignUpLi>현재 비밀번호</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput 
                                 type="password"
                                 name="currentPassword"
                                 placeholder="현재 비밀번호를 입력해주세요."
                                 value={formData.currentPassword}
                                 onChange={handleChange}/>
                        </s.InputRow>
                        {errors.currentPassword && <s.ErrorMessage>❗{errors.currentPassword}</s.ErrorMessage>}

                        <s.SignUpLi>새 비밀번호</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput 
                               type="password"
                               name="newPassword"
                               placeholder="새로운 비밀번호를 입력해주세요."
                               value={formData.newPassword}
                               onChange={handleChange} />
                        </s.InputRow>
                        {errors.newPassword && <s.ErrorMessage>❗{errors.newPassword}</s.ErrorMessage>}

                        <s.SignUpLi>비밀번호 확인</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput 
                                type="password"
                                name="newPasswordCheck"
                                placeholder="비밀번호를 한번 더 입력해주세요."
                                value={formData.newPasswordCheck}
                                onChange={handleChange}/>
                            {/* <s.SignUpDupli>변경하기</s.SignUpDupli> */}
                        </s.InputRow>
                        {errors.newPasswordCheck && <s.ErrorMessage>❗{errors.newPasswordCheck}</s.ErrorMessage>}

                    </ep.PasswordForm>
                )}
                
            <s.SignUpLi>이름</s.SignUpLi>
            <s.InputRow>
                <s.SignUpInput 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요." />
            </s.InputRow>
            {errors.name && <s.ErrorMessage>❗{errors.name}</s.ErrorMessage>}

            <s.SignUpLi>이메일</s.SignUpLi>
            <s.InputRow>
                {isKakaoUser ? (
                    // 카카오아이디가 있는 경우 (카카오 로그인 시)
                    <ep.ReadOnlyInput type="text" value={formData.email} readOnly />
                ) : (
                    // 로컬로 회원가입 했을 시 
                    <>
                        <s.SignUpInput
                            type="text" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="이메일을 입력해주세요." />
                        <s.SignUpDupli 
                        type='button'
                        className={
                        formData.email === checkResult.emailValue &&
                        !errors.email &&
                        checkResult.emailValue !== ''
                            ? 'active'
                            : ''
                        }
                        onClick={() => checkDuplicate('email')}>중복 확인</s.SignUpDupli>
                    </>
                )}
            </s.InputRow>
            {errors.email && <s.ErrorMessage>❗{errors.email}</s.ErrorMessage>}
            {checkResult.email && !errors.email && (
                <s.CheckMessage>{checkResult.email}</s.CheckMessage>
            )}

            <s.SignUpLi>휴대폰 번호</s.SignUpLi>
            <s.InputRow as='div'>
                <ep.ReadOnlyInput 
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                readOnly={!isPhoneEditable}
                onChange={handleChange}/>
                {isPhoneEditable ? (
                     <s.SignUpDupli 
                     type='button'
                    className={
                    formData.phoneNumber === checkResult.phoneNumberValue &&
                    !errors.phoneNumber &&
                    checkResult.phoneNumberValue !== ''
                        ? 'active'
                        : ''
                    }
                     onClick={() => checkDuplicate('phoneNumber')}>중복 확인</s.SignUpDupli>
                ) : (
                    <s.SignUpDupli type="button" onClick={() => setIsPhoneEditable(true)}>변경하기</s.SignUpDupli>
                )}
            </s.InputRow>
            {errors.phoneNumber && <s.ErrorMessage>❗{errors.phoneNumber}</s.ErrorMessage>}
            {checkResult.phoneNumber && !errors.phoneNumber && (
                <s.CheckMessage>{checkResult.phoneNumber}</s.CheckMessage>
            )}

            <s.SignUpLi>생년월일</s.SignUpLi>
            <s.InputRow>
                <ep.ReadOnlyInput type="text" name="birthDate" value={formData.birthDate} readOnly />
            </s.InputRow>

            <s.SignUpLi>성별</s.SignUpLi>
            <ep.GenderRow>
            <label>
                <input type="radio" value="female" checked={formData.gender === 'female'} disabled /> 여성
            </label>
            <label>
                <input type="radio" value="male" checked={formData.gender === 'male'} disabled /> 남성
            </label>
            <span>가입 시 선택된 성별은 수정할 수 없습니다.</span>
            </ep.GenderRow>

            <s.SignUpButton 
                type="button"
                onClick={handleSave}
                className={isChanged() ? 'active' : ''}
                disabled={!isChanged()}>저장하기
            </s.SignUpButton>

            <ep.WithdrawText 
                onClick={() => { 
                    setIsConfirmOpen(true);
                    setConfirmType('withdraw');
                }}
                >회원탈퇴
            </ep.WithdrawText>
            {isConfirmOpen && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    content={
                        confirmType === 'save' 
                        ? '회원정보를 저장하시겠습니까?'
                        : <>
                        회원 탈퇴 시 계정정보와 활동 기록이 삭제되며, <br/>복구가 불가능합니다. <br/>그래도 탈퇴하시겠습니까?
                        </>
                    }
                    title={confirmType === 'withdraw' ? '정말 탈퇴하시겠어요?':''}
                    showCancel={true}
                    confirmText="확인"
                    cancelText="취소"
                    onConfirm={async() => {
                        setIsConfirmOpen(false);
                        if (confirmType === 'save') {
                          // 저장 로직 실행
                          setResultMessage('회원정보가 저장되었습니다.');
                          await handleSave(); // 실제 저장 로직 실행
                        } else {
                            // 탈퇴일 때는 토큰 삭제 + API 호출
                            await handleWithdraw();
                            setResultMessage('회원 탈퇴가 완료되었습니다.');
                          }
                          setIsResultOpen(true);
                        }}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            )}
            {/* 결과 모달 */}
            {isResultOpen && (
            <ConfirmModal
                isOpen={isResultOpen}
                content={resultMessage}
                showCancel={false}
                confirmText="확인"
                onConfirm={() => {
                setIsResultOpen(false);
                if (confirmType === 'withdraw') {
                    // 여기서 한 번만 로그인 페이지로 이동
                    navigate('/login', { replace: true });
                }
                }}
            />
            )}
            </s.SignUpForm>
      </s.SignUpWrap>
    </ep.EditProfileContainer>
    )
}

export default EditProfile;