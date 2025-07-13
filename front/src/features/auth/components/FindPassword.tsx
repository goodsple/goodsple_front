import * as s from './SignUpStyle';
import * as f from './FindIdStyle';
import { useState } from 'react';


const FindPassword:React.FC = () => {

    const [isCounting, setIsCounting] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    return(
        <f.FindIdContainer>
            <s.SignUpWrap>
             <s.SignUpTitle>비밀번호 찾기</s.SignUpTitle>
                <s.SignUpForm>
                <s.SignUpLi>아이디</s.SignUpLi>
                    <s.InputRow>
                    <s.SignUpInput
                        type='text'
                        name='id'
                        placeholder='아이디를 입력해주세요.'/>
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

                    <s.SignUpLi>새 비밀번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='newPassword'
                        placeholder='비밀번호를 입력해주세요.'
                        disabled={!isVerified}/>
                    </s.InputRow>
                    
                    <s.SignUpLi>새 비밀번호 확인</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='password'
                        name='newPasswordCheck'
                        placeholder='비밀번호를 한번 더 입력해주세요.'
                        disabled={!isVerified}/>
                    </s.InputRow>

                    <s.SignUpButton>비밀번호 변경</s.SignUpButton>
                </s.SignUpForm>
             </s.SignUpWrap>
        </f.FindIdContainer>
    )
}
export default FindPassword;