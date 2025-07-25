import * as s from './SignUpStyle';
import * as f from './FindIdStyle';

import { useEffect, useMemo, useRef, useState } from 'react';
import {maskUserId} from './Mask';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const FindId:React.FC = () => {

    const navigate = useNavigate();

    const [isFound, setIsFound] = useState(false);  // 아이디 찾았는지 여부
    const [foundId, setFoundId] = useState("");  // 아이디 값
    const [isCounting, setIsCounting] = useState(false);  // 타이머 상태
    const [email, setEmail] = useState("");  // 입력받은 이메일
    const [name, setName] = useState("");  // 입력받은 이름
    const [authnumber, setAuthnumber] = useState("");  // 입력받은 인증번호
    const [timeLeft, setTimeLeft] = useState(0); 
    const [displayTimeLeft, setDisplayTimeLeft] = useState("");
    const [canResend, setCanResend] = useState(false); // 인증번호 재요청 가능 여부

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        authnumber: ''
    });

    const timerRef = useRef<number | null>(null);
    const [authTimeExpired, setAuthTimeExpired] = useState(false);  // 인증 시간 만료 여부
    
     // 인증번호 받기 클릭 시
     const handleGetCode = async() => {

         // 이전 에러 초기화
        setErrors(prev => ({
            ...prev,
            loginId: '',
            email: '',
            authnumber: '',
        }));

        // 빈값 체크
        if (!name.trim()) {
            setErrors(prev => ({ ...prev, name: '❗이름을 입력해 주세요.' }));
            return;
        }
          
        if (!email.trim()) {
            setErrors(prev => ({ ...prev, email: '❗이메일을 입력해 주세요.' }));
            return;
        }

        // 이름 형식 체크
        const nameRegex = /^[a-zA-Z가-힣]{2,20}$/;
        if (!nameRegex.test(name)) {
          setErrors(prev => ({ ...prev, name: '❗이름은 2자 이상 한글 또는 영문으로 입력해주세요.' }));
          return;

        }
        // 이메일 형식 체크
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prev => ({ ...prev, email: '❗올바른 이메일 형식이 아닙니다.' }));
            return;
        }
        try {

            // 클릭 즉시 타이머 세팅
            const initial = 180;
            setDisplayTimeLeft(`${Math.floor(initial/60)}:${String(initial%60).padStart(2, '0')}`);
            setTimeLeft(initial);
            setIsCounting(true);
            setAuthTimeExpired(false);
            setCanResend(false);
            setErrors(prev => ({ ...prev, authnumber: '' }));

            // 비동기로 API 호출 (성공/실패는 나중에 처리)
            await axiosInstance.post('/auth/find-id/request', { name, email });

          } catch (err: any) {
            // 실패 시 타이머 완전 리셋
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setIsCounting(false);
            setTimeLeft(0);
            setDisplayTimeLeft('');
            setCanResend(false);

             // 에러 메시지 표시
            setErrors(prev => ({
                ...prev,
                email: '❗가입되지 않은 정보입니다.'
              }));
          }
    }

    // 타이머 업데이트
    useEffect(() => {
        if (isCounting && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isCounting) {
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

    // 타이머 숫자 갱신
    useEffect(() => {
        if (timeLeft > 0) {
            setDisplayTimeLeft(`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`);
        }
    }, [timeLeft]);
    

    // 아이디 찾기 클릭 시 
    const handleFindId = async () => {
        if (!name.trim()) {
            setErrors(prev => ({ ...prev, name: '❗이름을 입력해 주세요.' }));
            return;
        }

        // 이름이 한글 또는 영문으로만, 최소 2글자~최대20글자 입력되도록 정규식 검증
        const nameRegex = /^[a-zA-Z가-힣]{2,20}$/;
        if (!nameRegex.test(name)) {
            setErrors(prev => ({ ...prev, name: '❗이름은 2자 이상 한글 또는 영문으로 입력해주세요.' }));
            return;
        }

        if (!authnumber.trim()) {
            setErrors(prev => ({ ...prev, authnumber: '❗인증번호를 입력해 주세요.' }));
            return;
        }

        // 인증번호가 만료되었는지 확인
        if (authTimeExpired) {
            setErrors(prev => ({ ...prev, authnumber: '❗인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요.' }));
            return;
        }

        try {
            // 아이디 찾기 API 호출
            const response = await axiosInstance.post('/auth/find-id', {
                name,
                email,
                code: authnumber,
            });

            // 반환된 아이디를 화면에 표시
            const loginId = response.data.split(':')[1]?.trim();
            setFoundId(loginId);   // 암호화된 아이디 반환
            setIsFound(true);  // 아이디를 찾았음을 표시
        } catch (error) {
            console.error("아이디 찾기 실패", error);
            setErrors(prev => ({ ...prev, authnumber: '❗인증번호 또는 회원 정보가 일치하지 않습니다.' }));
        }
    };

    // 입력 필드 값 변화 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

         // 값 업데이트
        if (name === 'email') setEmail(value);
        if (name === 'name') setName(value);
        if (name === 'authnumber') setAuthnumber(value);

        // 에러 메시지 갱신
        setErrors(prev => ({
            ...prev,
            [name]: value.trim() === '' ? `❗${e.target.placeholder}` : ''
        }));
    };

    // useEffect 대신 useMemo 로 간단하게
    const isSubmitDisabled = useMemo(() => {
        return !name.trim() || !email.trim() || !authnumber.trim();
    }, [name, email, authnumber]);


    return(
        <f.FindIdContainer>
            <s.SignUpWrap>
             <s.SignUpTitle>아이디 찾기</s.SignUpTitle>
                <s.SignUpForm onSubmit={e => e.preventDefault()}>
                <s.SignUpLi>이름</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        placeholder='이름을 입력해주세요.'/>
                    </s.InputRow>
                    {errors.name && <s.ErrorMessage>{errors.name}</s.ErrorMessage>}

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
                        {timeLeft > 0 && (
                            <f.TimerText>{displayTimeLeft}</f.TimerText>
                        )}
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
                    </s.InputRow>
                    {errors.authnumber && <s.ErrorMessage>{errors.authnumber}</s.ErrorMessage>}

                    <s.SignUpButton 
                        type='button'
                        onClick={handleFindId} 
                        disabled={isSubmitDisabled} 
                        className={isSubmitDisabled ? '' : 'active'}>아이디 찾기
                    </s.SignUpButton>
                    {isFound && (
                        <>
                            <f.FoundIdBox>회원님의 아이디는 <strong>{maskUserId(foundId)}</strong> 입니다!</f.FoundIdBox>
                            <f.LoginButton 
                                onClick={() => navigate("/login")}
                                disabled={isSubmitDisabled}
                            >로그인하러가기</f.LoginButton>
                        </>
                    )}
                </s.SignUpForm>
             </s.SignUpWrap>
        </f.FindIdContainer>
    )
}
export default FindId;