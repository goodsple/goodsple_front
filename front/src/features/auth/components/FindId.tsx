import * as s from './SignUpStyle';
import * as f from './FindIdStyle';

import { useState } from 'react';
import {maskUserId} from './Mask';
import { useNavigate } from 'react-router-dom';

const FindId:React.FC = () => {

    const [isFound, setIsFound] = useState(true);  // 아이디 찾았는지 여부
    const [foundId, setFoundId] = useState("asdfasdf");  // 아이디 값
    const [isCounting, setIsCounting] = useState(true);
    // const navigate = useNavigate();

    return(
        <f.FindIdContainer>
            <s.SignUpWrap>
             <s.SignUpTitle>아이디 찾기</s.SignUpTitle>
                <s.SignUpForm>
                <s.SignUpLi>이름</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='name'
                        placeholder='이름을 입력해주세요.'/>
                    </s.InputRow>
                <s.SignUpLi>이메일</s.SignUpLi>
                <f.EmailInputRow>
                    <s.SignUpInput
                        type="text"
                        name="email"
                        placeholder="이메일을 입력해주세요."
                    />
                    <f.ButtonTimerBox>
                        <s.SignUpDupli>인증번호 받기</s.SignUpDupli>
                        {isCounting && <f.TimerText>03:00</f.TimerText>}
                    </f.ButtonTimerBox>
                </f.EmailInputRow>
                        
                <s.SignUpLi>인증번호 입력</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='authnumber'
                        placeholder='인증번호를 입력해주세요.'/>
                    </s.InputRow>

                    <s.SignUpButton>아이디 찾기</s.SignUpButton>
                    {isFound && (
                        <>
                            <f.FoundIdBox>회원님의 아이디는 <strong>{maskUserId(foundId)}</strong> 입니다!</f.FoundIdBox>
                            <f.LoginButton>로그인하러가기</f.LoginButton>
                            {/* onClick={() => navigate("/login")} */}
                        </>
                        )}
                </s.SignUpForm>
             </s.SignUpWrap>
        </f.FindIdContainer>
    )
}
export default FindId;