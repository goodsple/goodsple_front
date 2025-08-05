import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import type { DupResultType, KakaoErrorType, KakaoFormDataType, TokenResponse } from '../types/kakao';
import type { AgreementsType } from '../types/signup';

import * as s from './SignUpStyle';
import * as k from './KakaoStyle';

import ServiceTerms from './ServiceTerms';
import PrivacyTerms from './PrivacyTerms';
import LocationTerms from './LocationTerms';
import MarketingTerms from './MarketingTerms';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useAuth } from '../contexts/AuthContext';
import type { UserProfile } from '../types/auth';


const KakaoInfo:React.FC = () => {

    const { setUserProfile } = useAuth();

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          // 카카오 SDK 초기화
          window.Kakao.init('YOUR_APP_KEY'); // YOUR_APP_KEY는 실제 카카오 개발자 사이트에서 발급받은 JavaScript 앱 키
          console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
        }
      }, []);

    // 라우터 훅
    const navigate = useNavigate();
    const { search } = useLocation();

    // 약관 모달 표시 여부
    const [showServiceTerms, setShowServiceTerms] = useState(false);
    const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
    const [showLocationTerms, setShowLocationTerms] = useState(false);
    const [showMarketingTerms, setShowMarketingTerms] = useState(false);

     // 폼 상태 관리
    const [formData, setFormData] = useState<KakaoFormDataType>({
        nickname:   '',
        name:       '',
        email:      '',
        phoneNumber:'',
        birthDate:  '',
        gender:     '',
        kakaoId:    '',
    });

    // 에러 상태 관리
    const [errors, setErrors] = useState<KakaoErrorType>({
        nickname: '',
        name: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
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

    // 중복 확인 상태 관리
    const [checkResult, setCheckResult] = useState<DupResultType>({
        nickname: '',
        nicknameValue: '',
        phoneNumber: '',
        phoneNumberValue: '',
    });

     // 버튼 활성화
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    // 모달
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  // 오픈 여부
    const [isResultOpen, setIsResultOpen] = useState(false); // 결과 모달

    // URL 쿼리에서 카카오로 받은 기본 정보 초기 세팅
    useEffect(() => {
        const qp = new URLSearchParams(search)
        setFormData(f => ({
        ...f,
        email:    qp.get('email')    ?? '',
        nickname: qp.get('nickname') ?? '',
        kakaoId:  qp.get('kakaoId')  ?? '',
        }))
    }, [search])

    // 입력 핸들러
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const key = name as keyof Omit<KakaoFormDataType, 'kakaoId'>

        // formData 업데이트
        setFormData(f => ({ ...f, [key]: value }))
        
        // 빈값 체크 후 에러 업데이트
        setErrors(prev => {
            const newErr = { ...prev };

            if (name === 'birthDate') {
                const inputDate = new Date(value);
                const today = new Date();
            
                if (!value) {
                    newErr.birthDate = '❗생년월일을 선택해 주세요.';
                } else if (inputDate > today) {
                    newErr.birthDate = '❗미래 날짜는 입력할 수 없습니다.';
                } else if (inputDate.getFullYear() < 1920) {
                    newErr.birthDate = '❗1920년 이후의 날짜만 입력할 수 있습니다.';
                } else {
                    newErr.birthDate = '';
                }
                return newErr;
            }

             // 생년월일이 아닌 항목에 대해 placeholder 빈값 검사
            if (value.trim() === '') {
              newErr[name as keyof KakaoErrorType] = `❗${e.target.placeholder}`;
            } else {
              newErr[name as keyof KakaoErrorType] = '';
            }
            return newErr;
        });
    }, [])

    // 중복 확인
    const handleCheckDuplicate = useCallback(
        async (type: 'nickname' | 'phoneNumber') => {
          const value = formData[type].trim();
          if (!value) return;
    
          const typeMap = {
            nickname: 'NICKNAME',
            phoneNumber: 'PHONE_NUMBER',
          } as const;
    
          try {
            const res = await axiosInstance.get<{ available: boolean }>('/auth/check', {
              params: { type: typeMap[type], value },
            });
    
            if (res.data.available) {
              // 사용 가능
              setCheckResult(prev => ({
                ...prev,
                [type]: `${type === 'nickname' ? '사용 가능한 닉네임입니다.' : '사용 가능한 휴대폰번호입니다.'}`,
                [`${type}Value`]: value,
              }));
              setErrors(prev => ({ ...prev, [type]: '' }));
               // 중복확인 완료 후 버튼 활성화
               if (type === 'nickname') {
                document.getElementById('nickname-check-btn')?.classList.add('active');
                } else if (type === 'phoneNumber') {
                    document.getElementById('phoneNumber-check-btn')?.classList.add('active');
                }
            } else {
              // 이미 사용 중
              setErrors(prev => ({
                ...prev,
                [type]: `❗이미 사용 중인 ${type === 'nickname' ? '닉네임' : '휴대폰 번호'}입니다.`
              }));
              setCheckResult(prev => ({
                ...prev,
                [type]: '',
                [`${type}Value`]: '',
              }));
               // 중복확인 실패 후 버튼 비활성화
               if (type === 'nickname') {
                document.getElementById('nickname-check-btn')?.classList.remove('active');
                } else if (type === 'phoneNumber') {
                    document.getElementById('phoneNumber-check-btn')?.classList.remove('active');
                }
            }
          } catch (e) {
            console.error('중복확인 오류:', e);
          }
        },
        [formData]
    );

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

    // 제출 전 검증 및 API 호출
    const handleSubmit = useCallback(() => {

         // 빈값 체크
        const newErrors: KakaoErrorType = {
            nickname: formData.nickname.trim()   ? '' : '❗닉네임을 입력해 주세요.',
            name:     formData.name.trim()       ? '' : '❗이름을 입력해 주세요.',
            email:    formData.email.trim()      ? '' : '❗이메일을 입력해 주세요.',
            phoneNumber: formData.phoneNumber.trim() ? '' : '❗휴대폰번호를 입력해 주세요.',
            birthDate:   formData.birthDate.trim()   ? '' : '❗생년월일을 입력해 주세요.',
            gender:      formData.gender           ? '' : '❗성별을 선택해 주세요.',
        }
        setErrors(newErrors)
        // 필드별 에러가 남아있으면 중단
        if (Object.values(newErrors).some(msg => msg)) return;

        // 중복검사 통과 여부
        const dupOk =
        checkResult.nickname === '사용 가능한 닉네임입니다.' &&
        formData.nickname  === checkResult.nicknameValue &&
        checkResult.phoneNumber === '사용 가능한 휴대폰번호입니다.' &&
        formData.phoneNumber  === checkResult.phoneNumberValue;
        if (!dupOk) {
            alert('중복 확인을 모두 완료해주세요.')
            return false;
        }

        // 필수 약관 체크 여부
        if (!agreements.service || !agreements.privacy) {
            setErrors(prev => ({ ...prev, agreements: '❗필수 약관에 모두 동의해주세요.' }));
            return;
        }

        // 모든 검사가 통과되었으니 모달 띄우기
        setIsConfirmOpen(true);
    }, [formData, checkResult,agreements]);
        

    // 회원가입 요청 후 토큰을 로컬에 저장하고 홈으로 이동
    //   모달 “확인” 클릭 시 실제 API 호출
    const handleConfirm = () => {
        axiosInstance
          .post<TokenResponse>('/auth/signup/kakao', {
            email:       formData.email,
            nickname:    formData.nickname,
            kakaoId:     formData.kakaoId,
            phoneNumber: formData.phoneNumber,
            gender:      formData.gender,
            birthDate:   formData.birthDate,
          })
          .then(res => {
                const { accessToken, refreshToken } = res.data;
                // 1) 받은 토큰을 로컬 스토리지에 저장
                localStorage.setItem('accessToken',  accessToken);
                localStorage.setItem('refreshToken', refreshToken);
        
                // 2) axiosInstance 에도 Authorization 헤더를 설정
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
                // 3) 이제야 /me 호출하면 헤더에 토큰이 포함됩니다
                return axiosInstance.get<UserProfile>('/users/me');
            })

            .then(r => {
            // 4) 컨텍스트에 프로필 세팅 → Header가 자동으로 리렌더링 됩니다.
            setUserProfile(r.data);
            navigate('/');

            // 5) 모달 로직
            setIsConfirmOpen(false);
            setIsResultOpen(true);
        })
          .catch(err => {
            console.error('회원가입 오류:', err.response ?? err);
            alert('❗회원가입 중 오류가 발생했습니다.');
          });
    };

    // 버튼 활성/비활성 토글
    useEffect(() => {
        const hasErr = Object.values(errors).some(msg => msg);
        const hasEmpty = Object.entries(formData)
            .filter(([k]) => k !== 'kakaoId')
            .some(([, v]) => !v.trim());
    
        const requiredAgreementsChecked = agreements.service && agreements.privacy;
        const genderSelected = !!formData.gender;
    
        setIsSubmitDisabled(hasErr || hasEmpty || !requiredAgreementsChecked || !genderSelected);
    }, [errors, formData, agreements]);

     
    return(
    
        <s.SignUpContainer>
            <s.SignUpWrap>
                <s.SignUpTitle>추가정보</s.SignUpTitle>

                <k.KakaoInfoGuide>
                👋 카카오 로그인 완료!<br/>서비스 이용을 위해 추가 정보를 입력해주세요!
                </k.KakaoInfoGuide>

                <s.SignUpForm onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    <s.SignUpLi>닉네임</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='nickname'
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder='닉네임을 입력해주세요.'
                        // placeholder={formData.nickname || '닉네임을 입력해주세요.'}
                       />
                        <s.SignUpDupli
                            type="button"
                            className={checkResult.nickname && formData.nickname === checkResult.nicknameValue ? 'active' : ''}
                            onClick={() => handleCheckDuplicate('nickname')}>
                            중복확인
                        </s.SignUpDupli>
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
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='이름을 입력해주세요.'/>
                    </s.InputRow>
                    {errors.name && <s.ErrorMessage>{errors.name}</s.ErrorMessage>}
                    
                    <s.SignUpLi>이메일</s.SignUpLi>
                    <s.InputRow>
                        <k.ReadOnlyInput
                        type='text'
                        name='email'
                        value={formData.email}
                        placeholder='이메일을 입력해주세요.'
                        readOnly
                        />
                    </s.InputRow>
                    
                    <s.SignUpLi>휴대폰 번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='number'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='휴대폰 번호를 입력해주세요.'
                       />
                        <s.SignUpDupli
                            type="button"
                            className={checkResult.phoneNumber && formData.phoneNumber === checkResult.phoneNumberValue ? 'active' : ''}
                            onClick={() => handleCheckDuplicate('phoneNumber')}>
                            중복확인
                        </s.SignUpDupli>
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
                        value={formData.birthDate}
                        onChange={handleChange}
                        placeholder='생년월일을 입력해주세요.'
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
                        type="submit" 
                        disabled={isSubmitDisabled}
                        className={isSubmitDisabled ? '' : 'active'}>등록하기</s.SignUpButton>
                </s.SignUpForm>

                 {/* 확인 모달 */}
                {isConfirmOpen && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    content="추가정보로 회원가입 하시겠습니까?"
                    showCancel
                    confirmText="확인"
                    cancelText="취소"
                    onConfirm={handleConfirm}
                    onCancel={() => setIsConfirmOpen(false)}
                />
                )}

                {/* 완료 모달 */}
                {isResultOpen && (
                <ConfirmModal
                    isOpen={isResultOpen}
                    content="회원가입이 완료되었습니다."
                    showCancel={false}
                    confirmText="확인"
                    onConfirm={() => navigate('/')}
                />
                )}
            </s.SignUpWrap>
        </s.SignUpContainer>
     
    )
}
export default KakaoInfo;