import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './SignUpStyle'

import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import PrivacyTerms from './PrivacyTerms';
import LocationTerms from './LocationTerms';
import MarketingTerms from './MarketingTerms';
import ServiceTerms from './ServiceTerms';
import type {FormDataType,ErrorType,AgreementsType} from '../types/signup'
import axiosInstance from '../../../api/axiosInstance';

const SignUp:React.FC = () => {

    // 회원정보 배열에 저장하기 db 칼럼과 동일하게 
    const [formData, setFormData] = useState<FormDataType>({
        loginId: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        name: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
    });

    // 예외 처리
    const [errors, setErrors] = useState<ErrorType>({
        loginId: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        name: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        agreements: "",
      });

    // 체크박스 항목
    const [agreements, setAgreements] = useState<AgreementsType>({
        all: false,
        service: false,
        privacy: false,
        location: false,
        marketing: false,
    });

    // 중복확인 결과
    const [checkResult, setCheckResult] = useState({
        loginId: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        loginIdValue: '',
        nicknameValue: '',
        emailValue: '',
        phoneNumberValue: '',
    });

    // 약관 내용 보기 
    const [showServiceTerms, setShowServiceTerms] = useState(false);
    const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
    const [showLocationTerms, setShowLocationTerms] = useState(false);
    const [showMarketingTerms, setShowMarketingTerms] = useState(false);
    
    // 모달
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  // 오픈 여부
    const [isResultOpen, setIsResultOpen] = useState(false); // 결과 모달

    const navigate = useNavigate();


    // input, radio,checkbox 등 변경 시 
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof ErrorType; 
        const value = e.target.value;

        if (name === 'gender') {
            setFormData((prev) => ({
                ...prev,
                gender: value,
            }));
            setErrors(prev => ({ ...prev, gender: '' }));
            return;
        }    
      
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      
        setErrors((prev) => {
          const newErrors = { ...prev };
      
          // 공통 처리: 빈값 체크
          newErrors[name] = value.trim() === "" ? `❗${e.target.placeholder}` : "";
      
          // 닉네임 길이 확인
          if (name === 'nickname') {
            if (value.trim() === '') {
              newErrors.nickname = '❗닉네임을 입력해 주세요.';
            } else if (value.length < 2 || value.length > 12) {
              newErrors.nickname = '❗닉네임은 2~12자 이내로 입력해주세요.';
            }
            // 비밀번호 체크
            } else if (name === 'password' || name === 'passwordCheck') {
                newErrors.passwordCheck =
                name === 'password'
                    ? formData.passwordCheck && value !== formData.passwordCheck
                    ? '❗비밀번호가 일치하지 않습니다.'
                    : ''
                    : value !== formData.password
                    ? '❗비밀번호가 일치하지 않습니다.'
                    : '';
            }
            return newErrors;
        });
       
        if (['loginId', 'nickname', 'email', 'phoneNumber'].includes(name)) {
            setCheckResult((prev) => ({ ...prev, [name]: '', [`${name}Value`]: '' }));
        }
    }, [formData]);

      // 개별 체크박스 클릭
      const handleSingleAgreeChange = useCallback((name: keyof AgreementsType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAgreements((prev) => {
          const newAgreements = { ...prev, [name]: checked };
          newAgreements.all =
            newAgreements.service &&
            newAgreements.privacy &&
            newAgreements.location &&
            newAgreements.marketing;
            setErrors((prevErrors) => ({
                ...prevErrors,
                agreements: newAgreements.service && newAgreements.privacy ? "" : "❗필수 약관(이용약관, 개인정보 수집 및 이용)에 모두 동의해주세요.",
            }));
          return newAgreements;
        });
      }, []);

      // 전체동의 클릭
    const handleAllAgreeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAgreements({
            all: checked,
            service: checked,
            privacy: checked,
            location: checked,
            marketing: checked,
        });
        setErrors(prev => ({ ...prev, agreements: '' }));
    }, []);

    //중복확인 결과 체크 
    const handleCheckDuplicate = useCallback(async (type: 'loginId' | 'nickname' | 'email' | 'phoneNumber') => {
        const value = formData[type];
        if (!value.trim()) return;

        const typeMap = {
            loginId: "LOGIN_ID",
            nickname: "NICKNAME",
            email: "EMAIL",
            phoneNumber: "PHONE_NUMBER",
          };
        try {
            const res = await axiosInstance.get(`/auth/check?type=${typeMap[type]}&value=${value}`);

          console.log('중복확인 응답:', res.data);
          const successMsg = {
            loginId: '사용 가능한 아이디 입니다.',
            nickname: '사용 가능한 닉네임 입니다.',
            email: '사용 가능한 이메일 입니다.',
            phoneNumber: '사용 가능한 휴대폰 번호 입니다.',
          };
          if (res.data.available) {
            setCheckResult((prev) => ({ ...prev, [type]: successMsg[type], [`${type}Value`]: value, checkedButton: type }));
            setErrors((prev) => ({ ...prev, [type]: '' }));
          } else {
            const typeName = {
                loginId: '아이디',
                nickname: '닉네임',
                email: '이메일',
                phoneNumber: '휴대폰 번호'
            };
            setErrors((prev) => ({ ...prev, [type]: `❗이미 사용 중인 ${typeName[type]} 입니다.` }));
            setCheckResult((prev) => ({ ...prev, [type]: '', [`${type}Value`]: '' }));
          }
        } catch (error) {
          console.error(error);
        }
    }, [formData]);

    // 중복확인 결과
    const isCheckResultValid = useMemo(() => {
        return (
          checkResult.loginId === '사용 가능한 아이디 입니다.' && formData.loginId === checkResult.loginIdValue &&
          checkResult.nickname === '사용 가능한 닉네임 입니다.' && formData.nickname === checkResult.nicknameValue &&
          checkResult.email === '사용 가능한 이메일 입니다.' && formData.email === checkResult.emailValue &&
          checkResult.phoneNumber === '사용 가능한 휴대폰 번호 입니다.' && formData.phoneNumber === checkResult.phoneNumberValue
        );
    }, [formData, checkResult]);
    

    // 가입하기 버튼 이벤트
    const handleRegisterClick = useCallback(() => {
        const loginIdRegex = /^[a-zA-Z0-9]{5,20}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const phoneRegex = /^010\d{7,8}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
        const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,20}$/;
        const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;

        // 생년월일 유효성 검사 추가
        const today = new Date();
        const birthDate = new Date(formData.birthDate);

        const newErrors = {
            ...errors,
            loginId: formData.loginId.match(loginIdRegex) ? '' : '❗아이디는 영문 + 숫자 조합으로 5~20자 이내로 입력해 주세요.',
            password: formData.password.match(passwordRegex) ? '' : '❗영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.',
            passwordCheck: formData.password !== formData.passwordCheck ? '❗비밀번호가 일치하지 않습니다.' : '',
            nickname: formData.nickname.match(nicknameRegex) ? '' : '❗닉네임에는 특수문자를 사용할 수 없습니다.',
            name: formData.name.match(nameRegex) ? '' : '❗이름은 한글 또는 영문으로 입력해 주세요.',
            email: formData.email.match(emailRegex) ? '' : '❗올바른 이메일 형식이 아닙니다.',
            phoneNumber: formData.phoneNumber.match(phoneRegex) ? '' : '❗숫자만 입력해 주세요. ex: 01012345678',
            birthDate: formData.birthDate ? '' : '❗생년월일을 선택해 주세요.',
            gender: formData.gender ? '' : '❗성별을 선택해 주세요.',
            agreements:
              agreements.service && agreements.privacy
                ? ''
                : '❗필수 약관(이용약관, 개인정보 수집 및 이용)에 모두 동의해주세요.',
        };
        if (formData.birthDate) {
            if (birthDate > today) {
              newErrors.birthDate = '❗미래 날짜는 입력할 수 없습니다.';
            } else if (birthDate.getFullYear() < 1920) {
              newErrors.birthDate = '❗1920년 이후의 날짜만 입력할 수 있습니다.';
            }
        }

        // 유효성 검사 후
        const newCheckResult = { ...checkResult };

        if (!formData.loginId.match(loginIdRegex)) {
        newCheckResult.loginId = '';
        newCheckResult.loginIdValue = '';
        }
        if (!formData.nickname.match(nicknameRegex)) {
        newCheckResult.nickname = '';
        newCheckResult.nicknameValue = '';
        }
        if (!formData.email.match(emailRegex)) {
        newCheckResult.email = '';
        newCheckResult.emailValue = '';
        }
        if (!formData.phoneNumber.match(phoneRegex)) {
        newCheckResult.phoneNumber = '';
        newCheckResult.phoneNumberValue = '';
        }
        setCheckResult(newCheckResult);

        setErrors(newErrors);

        if (!isCheckResultValid) {
            alert('중복 확인을 완료해 주세요.');
            return;
        }
        const hasError = Object.values(newErrors).some((msg) => msg !== '');
        if (hasError) return;
        setIsConfirmOpen(true);
    }, [errors, isCheckResultValid]);

    // 회원가입 완료
    const handleConfirm = async() => {
        const { passwordCheck, ...payload } = formData;
        console.log("보내는 payload:", payload);
       try{
            await axiosInstance.post("/auth/signup" ,payload);
            setIsConfirmOpen(false);
            setIsResultOpen(true);
       }catch (err: any) {
        console.error("회원가입 에러 응답 본문:", err.response?.data);
      }
    };

    // 가입하기 활성 여부
    const isSubmitDisabled = useMemo(() => {
        // 빈값 체크
        const hasEmpty = Object.values(formData).some(value => value.trim() === "");
        // 에러 체크
        const hasError = Object.entries(errors).some(([key, msg]) => key !== "agreements" && msg !== '');
        
        const isRequiredAgreementsChecked = agreements.service && agreements.privacy;

        return hasEmpty || hasError || !isRequiredAgreementsChecked;
    }, [formData, errors, agreements.service, agreements.privacy]);

    // 결과 모달
    const handleResultConfirm = () => {
        setIsResultOpen(false);
        navigate("/login");
      };

    return(
        <s.SignUpContainer>
            <s.SignUpWrap>
            <s.SignUpTitle>회원가입</s.SignUpTitle>
                <s.SignUpForm onSubmit={(e) => e.preventDefault()}>
                    <s.SignUpLi>아이디</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='loginId'
                        placeholder="아이디를 입력해 주세요."
                        value={formData.loginId}
                        onChange={handleChange}/>
                         <s.SignUpDupli 
                            type="button" 
                            className={
                                checkResult.loginId === '사용 가능한 아이디 입니다.' &&
                                formData.loginId === checkResult.loginIdValue
                                  ? 'active'
                                  : ''
                              }
                            onClick={() => handleCheckDuplicate('loginId')}>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    {errors.loginId && <s.ErrorMessage>{errors.loginId}</s.ErrorMessage>}
                    {checkResult.loginId && formData.loginId === checkResult.loginIdValue && (
                    <s.CheckMessage>{checkResult.loginId}</s.CheckMessage>
                    )}

                    <s.SignUpLi>비밀번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='password'
                        placeholder='비밀번호를 입력해 주세요.'
                        value={formData.password}
                        onChange={handleChange}/>
                    </s.InputRow>
                    {errors.password && <s.ErrorMessage>{errors.password}</s.ErrorMessage>}
                    
                    <s.SignUpLi>비밀번호 확인</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='passwordCheck'
                        placeholder='비밀번호를 한번 더 입력해 주세요.'
                        value={formData.passwordCheck}
                        onChange={handleChange}/>
                    </s.InputRow>
                    {errors.passwordCheck && <s.ErrorMessage>{errors.passwordCheck}</s.ErrorMessage>}

                    <s.SignUpLi>닉네임</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='nickname'
                        placeholder='닉네임을 입력해 주세요.'
                        value={formData.nickname}
                        onChange={handleChange}/>
                        <s.SignUpDupli 
                            type="button" 
                            className={
                                checkResult.nickname === '사용 가능한 닉네임 입니다.' &&
                                formData.nickname === checkResult.nicknameValue
                                  ? 'active'
                                  : ''
                              }
                            onClick={()=> handleCheckDuplicate("nickname")}>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    {errors.nickname && <s.ErrorMessage>{errors.nickname}</s.ErrorMessage>}
                    {checkResult.nickname && formData.nickname === checkResult.nicknameValue && (
                    <s.CheckMessage>{checkResult.nickname}</s.CheckMessage>
                    )}
                    
                    <s.SignUpLi>이름</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='name'
                        placeholder='이름을 입력해 주세요.'
                        value={formData.name}
                        onChange={handleChange}/>
                    </s.InputRow>
                    {errors.name && <s.ErrorMessage>{errors.name}</s.ErrorMessage>}
                    
                    <s.SignUpLi>이메일</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='email'
                        placeholder='이메일을 입력해 주세요.'
                        value={formData.email}
                        onChange={handleChange}/>
                        <s.SignUpDupli 
                            type="button" 
                            className={
                                checkResult.email === '사용 가능한 이메일 입니다.' &&
                                formData.email === checkResult.emailValue
                                  ? 'active'
                                  : ''
                              }
                            onClick={()=> handleCheckDuplicate("email")}>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    {errors.email && <s.ErrorMessage>{errors.email}</s.ErrorMessage>}
                    {checkResult.email && formData.email === checkResult.emailValue && (
                    <s.CheckMessage>{checkResult.email}</s.CheckMessage>
                    )}
                    
                    <s.SignUpLi>휴대폰 번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='number'
                        name='phoneNumber'
                        placeholder='휴대폰 번호를 입력해 주세요.'
                        value={formData.phoneNumber}
                        onChange={handleChange}/>
                        <s.SignUpDupli 
                            type="button" 
                            className={
                                checkResult.phoneNumber === '사용 가능한 휴대폰 번호 입니다.' &&
                                formData.phoneNumber === checkResult.phoneNumberValue
                                  ? 'active'
                                  : ''
                              }
                            onClick={()=> handleCheckDuplicate("phoneNumber")}>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    {errors.phoneNumber && <s.ErrorMessage>{errors.phoneNumber}</s.ErrorMessage>}
                    {checkResult.phoneNumber && formData.phoneNumber === checkResult.phoneNumberValue && (
                    <s.CheckMessage>{checkResult.phoneNumber}</s.CheckMessage>
                    )}
                    
                    <s.SignUpLi>생년월일</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='date'
                        name='birthDate'
                        placeholder='생년월일을 입력해 주세요.'
                        value={formData.birthDate}
                        onChange={handleChange} 
                        min="1920-01-01"
                        max={new Date().toISOString().split("T")[0]}  // 오늘 날짜까지만 선택 가능
                    />
                    </s.InputRow>
                    {errors.birthDate && <s.ErrorMessage>{errors.birthDate}</s.ErrorMessage>}
                    
                     <s.SignUpLi>성별</s.SignUpLi>
                     <s.InputRow>
                        <s.RadioGroup>
                            <label>
                                <input 
                                    type="radio" 
                                    name="gender"
                                    value="FEMALE" 
                                    checked={formData.gender === 'FEMALE'}
                                    onChange={handleChange} 
                                /> 여성
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="gender"
                                    value="MALE" 
                                    checked={formData.gender === 'MALE'}
                                    onChange={handleChange} 
                                /> 남성
                            </label>
                        </s.RadioGroup>
                     </s.InputRow>
                     {errors.gender && <s.ErrorMessage>{errors.gender}</s.ErrorMessage>}
                   
                    {/* <s.SignUpLi>약관 동의</s.SignUpLi> */}
                    <s.CheckboxGroup>
                        <label>
                            <input 
                            type="checkbox" 
                            checked={agreements.all} 
                            onChange={handleAllAgreeChange}/> 전체 동의
                        </label>
                        <label>
                            <input 
                            type="checkbox"
                            placeholder='이용약관에 동의하셔야 가입할 수 있습니다.'
                            checked={agreements.service} 
                            onChange={handleSingleAgreeChange("service")} 
                            /> 서비스 이용약관 동의 (필수)
                            <button type="button" onClick={() => setShowServiceTerms(!showServiceTerms)}>내용보기</button>
                        </label>
                        {showServiceTerms && (
                            <ServiceTerms/>
                        )}
                        <label>
                            <input 
                            type="checkbox"
                            placeholder='개인정보 수집 및 이용에 동의하셔야 가입할 수 있습니다.'
                            checked={agreements.privacy} 
                            onChange={handleSingleAgreeChange("privacy")}
                            /> 개인정보 수집 및 이용 동의 (필수)
                            <button type="button" onClick={() => setShowPrivacyTerms(!showPrivacyTerms)}>내용보기</button>
                        </label>

                        {showPrivacyTerms && (
                           <PrivacyTerms/>
                        )}
                        <label>
                            <input 
                            type="checkbox"
                            checked={agreements.location} 
                            onChange={handleSingleAgreeChange("location")} /> 위치기반서비스 이용 동의 (선택)
                            <button type="button" onClick={() => setShowLocationTerms(!showLocationTerms)}>내용보기</button>
                        </label>
                        {showLocationTerms && (
                            <LocationTerms/>
                        )}
                        <label>
                            <input 
                            type="checkbox"
                            checked={agreements.marketing} 
                            onChange={handleSingleAgreeChange("marketing")} /> 마케팅 정보 수신 동의 (선택)
                            <button type="button" onClick={() => setShowMarketingTerms(!showMarketingTerms)}>내용보기</button>
                        </label>
                        {showMarketingTerms && (
                            <MarketingTerms/>
                        )}
                    </s.CheckboxGroup>
                    {errors.agreements && <s.ErrorMessage>{errors.agreements}</s.ErrorMessage>}
                    
                    <s.SignUpButton 
                        type="button"
                        onClick={handleRegisterClick}  
                        disabled={isSubmitDisabled}
                        className={isSubmitDisabled ? '' : 'active'}>가입하기</s.SignUpButton>
                
                    {isConfirmOpen && (
                        <ConfirmModal
                            isOpen={isConfirmOpen}
                            content="회원가입 하시겠습니까?"
                            showCancel={true}
                            confirmText="확인"
                            cancelText="취소"
                            onConfirm={handleConfirm}
                            onCancel={() => setIsConfirmOpen(false)}
                        />
                        )}

                        {isResultOpen && (
                        <ConfirmModal
                            isOpen={isResultOpen}
                            content="회원가입이 완료되었습니다."
                            showCancel={false}
                            confirmText="확인"
                            onConfirm={handleResultConfirm}
                        />
                        )}
                </s.SignUpForm>
            </s.SignUpWrap>
        </s.SignUpContainer>
    )
}
export default SignUp;