import * as s from './SignUpStyle';
import * as f from './FindIdStyle';
import { useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';


const FindPassword:React.FC = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [email, setEmail] = useState("");  // 입력받은 이메일
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isCounting, setIsCounting] = useState(false);  // 타이머 상태
    const [authnumber, setAuthnumber] = useState("");  // 입력받은 인증번호
    const [timeLeft, setTimeLeft] = useState(180); // 3분 (180초)
    const [canResend, setCanResend] = useState(false); // 인증번호 재요청 가능 여부
    const [isVerified, setIsVerified] = useState(false); // 인증번호 검증 완료 여부
  
    const timerRef = useRef<number | null>(null);
    const [authTimeExpired, setAuthTimeExpired] = useState(false);  // 인증 시간 만료 여부

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  // 오픈 여부
    const [isResultOpen, setIsResultOpen] = useState(false); // 결과 모달

    const [errors, setErrors] = useState({
        email: '',
        loginId: '',
        authnumber: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [success, setSuccess] = useState({
        authnumber: '',
    });    

    const [touched, setTouched] = useState({
        newPassword: false,
        confirmPassword: false
    });

     // 입력 필드 값 변화 처리
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: '' }));  // 필드 변경 시 에러 메시지 초기화
        if (name === 'loginId') setLoginId(value);
        if (name === 'email') setEmail(value);
        if (name === 'authnumber') setAuthnumber(value);
        if (name === 'newPassword') {
            setNewPassword(value);
            setTouched(prev => ({ ...prev, newPassword: true }));
          }
          if (name === 'newPasswordCheck') {
            setConfirmPassword(value);
            setTouched(prev => ({ ...prev, confirmPassword: true }));
          }
    };
    
     // 인증번호 받기 클릭 시
     const handleGetCode = async () => {
        // 빈값 체크
        if (!loginId.trim()) {
            setErrors(prev => ({ ...prev, loginId: '❗아이디를 입력해 주세요.' }));
            return;
        }
        if (!email.trim()) {
            setErrors(prev => ({ ...prev, email: '❗이메일을 입력해 주세요.' }));
            return;
        }
    
        // 이메일 형식 체크
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prev => ({ ...prev, email: '❗올바른 이메일 형식이 아닙니다.' }));
            return;
        }
    
        try {
    
            // 타이머 및 상태 초기화
            setIsCounting(true); 
            setTimeLeft(180);
            setAuthTimeExpired(false);

            // 인증번호 요청
            await axiosInstance.post('/auth/find-password/request', { loginId,  email });
    
            // setSuccess(prev => ({
            //     ...prev,
            //     authnumber: '인증번호가 전송되었습니다. 이메일을 확인해 주세요.',
            // }));

        } catch (err: any) {
            setIsCounting(false);  // 실패 시 타이머 중단
            setTimeLeft(0);        // 시간 초기화
    
            setErrors(prev => ({
                ...prev,
                email: '❗인증번호 요청 중 오류가 발생했습니다. 아이디와 이메일을 확인해 주세요.'
            }));
        }
    };
    

    const handleVerifyCode = async () => {
        if (!loginId.trim()) {
            setErrors(prev => ({ ...prev, loginId: '❗아이디를 입력해 주세요.' }));
            setSuccess(prev => ({ ...prev, authnumber: '' }));
            return;
        }
    
        if (!authnumber.trim()) {
            setErrors(prev => ({ ...prev, authnumber: '❗인증번호를 입력해 주세요.' }));
            setSuccess(prev => ({ ...prev, authnumber: '' }));
            return;
        }
    
        if (authTimeExpired) {
            setErrors(prev => ({ ...prev, authnumber: '❗인증 시간이 만료되었습니다. 다시 요청해주세요.' }));
            setSuccess(prev => ({ ...prev, authnumber: '' }));
            return;
        }
    
        try {
            await axiosInstance.post('/auth/find-password/verify', {
                loginId,
                email,
                code: authnumber,
            });
    
            setIsVerified(true);
            setSuccess(prev => ({ ...prev, authnumber: '인증번호가 확인되었습니다. 새 비밀번호를 입력해 주세요.' }));
            setErrors(prev => ({ ...prev, authnumber: '', newPassword: '', confirmPassword: '' })); // 에러 제거
        } catch (error: any) {
            setIsVerified(false);
            setSuccess(prev => ({ ...prev, authnumber: '' })); // 성공 메시지 제거
            if (error.response?.status === 404) {
                setErrors(prev => ({ ...prev, loginId: '❗존재하지 않는 아이디입니다.' }));
            } else {
                setErrors(prev => ({ ...prev, authnumber: '❗인증번호가 일치하지 않습니다.' }));
            }
        }
    };
    
    const validatePasswords = () => {
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let tempErrors = {
            newPassword: '',
            confirmPassword: '',
        };
      
        let valid = true;
      
        if (!pwRegex.test(newPassword)) {
          tempErrors.newPassword = '❗비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.';
          valid = false;
        }
      
        if (newPassword !== confirmPassword) {
          tempErrors.confirmPassword = '❗비밀번호가 일치하지 않습니다.';
          valid = false;
        }
      
        setErrors(prev => ({
            ...prev,
            ...tempErrors,
        }));

        return valid;
    };

    const handleConfirm = async () => {
        if (!isVerified) {
            alert('인증이 완료되지 않았습니다.');
            return;
        }

        if (!validatePasswords()) return;
      
        try {
          await axiosInstance.post('/auth/find-password/reset', {
            loginId,
            email,
            code: authnumber,
            newPassword
          }, {
            headers: {
              Authorization: undefined
            }
          });
          setIsConfirmOpen(false);
          setIsResultOpen(true);
        } catch (err: any) {
            console.log('❗에러 응답 메시지:', err.response?.data?.message || '');

            setErrors(prev => ({
                ...prev,
                newPassword: '❗기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.'
            }));

            setIsConfirmOpen(false); 
        }
    };

    useEffect(() => {
        // 인증된 경우에만 검사
        if (!isVerified) return;
      
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
        setErrors(prev => ({
            ...prev,
            newPassword: touched.newPassword
              ? !newPassword
                ? '❗새 비밀번호를 입력해 주세요.'
                : !pwRegex.test(newPassword)
                  ? '❗영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
                  : ''
              : '',
            confirmPassword: touched.confirmPassword
              ? !confirmPassword
                ? '❗비밀번호 확인을 입력해 주세요.'
                : newPassword !== confirmPassword
                  ? '❗비밀번호가 일치하지 않습니다.'
                  : ''
              : ''
        }));
    }, [newPassword, confirmPassword, isVerified, touched]);

    
    // 타이머 업데이트
    useEffect(() => {
        if (isCounting && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setAuthTimeExpired(true); // 타이머 종료 시 인증시간 만료
            setIsCounting(false);
            setCanResend(true); // 타이머 끝나면 재전송 가능 표시
            if (timerRef.current !== null) {
                clearInterval(timerRef.current); // 타이머 종료
                timerRef.current = null;
            }
        }
    
        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current); // 컴포넌트 unmount 시 타이머 정리
                timerRef.current = null;
            }
        };
    }, [isCounting, timeLeft]);

    const isSubmitDisabled = useMemo(() => {
    return (
        !loginId.trim() ||
        !email.trim() ||
        !authnumber.trim() ||
        !newPassword.trim() ||
        !confirmPassword.trim() ||
        !!errors.newPassword ||
        !!errors.confirmPassword
    );
    }, [loginId, email, authnumber, newPassword, confirmPassword, errors]);

    // 이메일, 아이디 변경 시 인증 상태 초기화
    useEffect(() => {
        setIsVerified(false);
        setAuthnumber('');
    }, [email, loginId]);

    // 결과 모달
    const handleResultConfirm = () => {
    setIsResultOpen(false);
    navigate("/login");
    };

    return(
        <f.FindIdContainer>
            <s.SignUpWrap>
             <s.SignUpTitle>비밀번호 찾기</s.SignUpTitle>
                <s.SignUpForm onSubmit={e => e.preventDefault()}>
                <s.SignUpLi>아이디</s.SignUpLi>
                    <s.InputRow>
                    <s.SignUpInput
                        type='text'
                        name='loginId'
                        value={loginId}
                        onChange={handleChange}
                        placeholder='아이디를 입력해주세요.'/>
                    </s.InputRow>
                    {errors.loginId && <s.ErrorMessage>{errors.loginId}</s.ErrorMessage>}

                <s.SignUpLi>이메일</s.SignUpLi>
                <f.EmailInputRow>
                    <s.SignUpInput
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="이메일을 입력해주세요."
                    />
                    <f.ButtonTimerBox>
                        <s.SignUpDupli  
                            type="button" 
                            onClick={handleGetCode}
                            disabled={isCounting}
                            className={canResend ? 'active' : ''} >
                            {canResend ? '다시 받기' : '인증번호 받기'}
                        </s.SignUpDupli>
                        {isCounting && <f.TimerText>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</f.TimerText>}
                    </f.ButtonTimerBox>
                </f.EmailInputRow>
                {errors.email && <s.ErrorMessage>{errors.email}</s.ErrorMessage>}
                        
                <s.SignUpLi>인증번호 입력</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='authnumber'
                        value={authnumber}
                        onChange={handleChange}
                        placeholder='인증번호를 입력해주세요.'/>

                        <s.SignUpDupli 
                            type="button" 
                            onClick={handleVerifyCode}
                            className={isVerified ? 'active' : ''}>확인</s.SignUpDupli>
                    </s.InputRow>
                    {errors.authnumber && <s.ErrorMessage>{errors.authnumber}</s.ErrorMessage>}
                    {success.authnumber && <s.CheckMessage>{success.authnumber}</s.CheckMessage>}

                    <s.SignUpLi>새 비밀번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={handleChange}
                        placeholder='비밀번호를 입력해주세요.'
                        disabled={!isVerified}/>
                    </s.InputRow>
                    {errors.newPassword && <s.ErrorMessage>{errors.newPassword}</s.ErrorMessage>}
                    
                    <s.SignUpLi>새 비밀번호 확인</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='newPasswordCheck'
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder='비밀번호를 한번 더 입력해주세요.'
                        disabled={!isVerified}/>
                    </s.InputRow>
                    {errors.confirmPassword && <s.ErrorMessage>{errors.confirmPassword}</s.ErrorMessage>}

                    <s.SignUpButton 
                        type='button'
                        disabled={isSubmitDisabled}
                        onClick={() => {
                            if (!isVerified) {
                              alert('인증을 완료해주세요.');
                              return;
                            }
                            setIsConfirmOpen(true);
                        }}
                        className={isSubmitDisabled ? '' : 'active'}
                        >비밀번호 변경</s.SignUpButton>
                    {isConfirmOpen && (
                        <ConfirmModal
                            isOpen={isConfirmOpen}
                            content="비밀번호 변경 하시겠습니까?"
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
                            content="비밀번호가 변경되었습니다."
                            showCancel={false}
                            confirmText="확인"
                            onConfirm={handleResultConfirm}
                        />
                        )}
                </s.SignUpForm>
             </s.SignUpWrap>
        </f.FindIdContainer>
    )
}
export default FindPassword;