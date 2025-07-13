import * as ep from './EditProfileStyle';
import * as s from '../../auth/components/SignUpStyle';

import profileImg from '../../../assets/images/default_profile.png'
import arrowImg from '../../../assets/images/arrow_right.png'
import { useState } from 'react';

const EditProfile:React.FC = () => {

    const [isPhoneEditable, setIsPhoneEditable] = useState(false); // 휴대폰번호 변경 여부
    const [phone,setPhone] = useState("01012345678");
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const [email, setEmail] = useState("goodsple@naver.com");
    const isKakaoUser = true; // 예시값. 실제로는 props나 context로 관리

    return (
        <ep.EditProfileContainer>
            <s.SignUpWrap>
            <s.SignUpTitle>회원정보 수정</s.SignUpTitle>

                <ep.ProfileImageWrap>
                <ep.ProfileImage>
                    <img src={profileImg} alt="프로필기본이미지" />
                </ep.ProfileImage>
                <label htmlFor="profileImage">
                    <ep.UploadButton as="span">이미지 업로드</ep.UploadButton>
                    <ep.HiddenFileInput type="file" id="profileImage"  className="hiddenFileInput" onChange={(e) => console.log(e.target.files)} />
                </label>
                </ep.ProfileImageWrap>

                <s.SignUpForm>
                <s.SignUpLi>닉네임</s.SignUpLi>
                <s.InputRow>
                    <s.SignUpInput type="text" name="nickname" placeholder="닉네임을 입력해주세요." />
                    <s.SignUpDupli>중복 확인</s.SignUpDupli>
                </s.InputRow>

                <s.SignUpLi>아이디</s.SignUpLi>
                <s.InputRow>
                    <ep.ReadOnlyInput type="text" value="asehg" readOnly />
                </s.InputRow>

                <ep.PasswordToggleButton type="button" onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                    <span>비밀번호 변경</span>
                    <img src={arrowImg} alt="화살표" className={isPasswordOpen ? 'rotate-up' : 'rotate-down'} />
                </ep.PasswordToggleButton>

                {isPasswordOpen && (
                    <ep.PasswordForm>
                        <s.SignUpLi>현재 비밀번호</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput type="password" placeholder="현재 비밀번호를 입력해주세요." value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </s.InputRow>
                        <s.SignUpLi>새 비밀번호</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput type="password" placeholder="새로운 비밀번호를 입력해주세요." value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </s.InputRow>
                        <s.SignUpLi>비밀번호 확인</s.SignUpLi>
                        <s.InputRow>
                            <s.SignUpInput type="password" placeholder="비밀번호를 한번 더 입력해주세요." value={newPasswordCheck} onChange={(e) => setNewPasswordCheck(e.target.value)} />
                            <s.SignUpDupli>변경하기</s.SignUpDupli>
                        </s.InputRow>
                    </ep.PasswordForm>
                )}
                
            <s.SignUpLi>이름</s.SignUpLi>
            <s.InputRow>
                <s.SignUpInput type="text" value="홍길동" readOnly />
            </s.InputRow>

            <s.SignUpLi>이메일</s.SignUpLi>
            <s.InputRow>
                {isKakaoUser ? (
                    <ep.ReadOnlyInput type="text" value={email} readOnly />
                ) : (
                    <>
                        <ep.EditableInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <s.SignUpDupli>중복 확인</s.SignUpDupli>
                    </>
                )}
            </s.InputRow>

            <s.SignUpLi>휴대폰 번호</s.SignUpLi>
            <s.InputRow>
                <ep.ReadOnlyInput 
                type="number"
                value={phone}
                readOnly={!isPhoneEditable}
                onChange={(e) => setPhone(e.target.value)}/>
                {isPhoneEditable?(
                    <s.SignUpDupli>중복 확인</s.SignUpDupli>
                ):(
                    <s.SignUpDupli onClick={() => setIsPhoneEditable(true)}>변경하기</s.SignUpDupli>
                )}
            </s.InputRow>

            <s.SignUpLi>생년월일</s.SignUpLi>
            <s.InputRow>
                <ep.ReadOnlyInput type="text" value="20000101" readOnly />
            </s.InputRow>

            <s.SignUpLi>성별</s.SignUpLi>
            <ep.GenderRow>
                <input type="radio" value="여성" checked disabled /> 여성
                <input type="radio" value="남성" disabled /> 남성
                <span>가입 시 선택된 성별은 수정할 수 없습니다.</span>
            </ep.GenderRow>

            <s.SignUpButton>저장하기</s.SignUpButton>
            <ep.WithdrawText>회원탈퇴</ep.WithdrawText>
            </s.SignUpForm>
      </s.SignUpWrap>
    </ep.EditProfileContainer>
    )
}

export default EditProfile;