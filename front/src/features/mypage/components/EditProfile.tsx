import * as ep from './EditProfileStyle';
import * as s from '../../auth/components/SignUpStyle';

import profileImg from '../../../assets/images/default_profile.png'
import arrowImg from '../../../assets/images/arrow_right.png'

import { useState } from 'react';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const EditProfile:React.FC = () => {

    const [isPhoneEditable, setIsPhoneEditable] = useState(false); // 휴대폰번호 변경 여부
    const [phone,setPhone] = useState("01012345678");
    const [isPasswordOpen, setIsPasswordOpen] = useState(false); // 비밀번호 변경 토글 여부
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const [email, setEmail] = useState("goodsple@naver.com");
    const [gender, setGender] = useState<string>("female");
    const isKakaoUser = true; // 예시값. 실제로는 props나 context로 관리
    const [userProfileImg, setUserProfileImg] = useState<string | null>(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);  // 모달 여부
    const [confirmType, setConfirmType] = useState<'save'|'withdraw'|null>(null);  // 모달 타입 (저장, 탈퇴)
    const [isResultOpen, setIsResultOpen] = useState(false); // 확인 시 나오는 모달
    const [resultMessage, setResultMessage] = useState(''); // 결과 메시지

    const navigate = useNavigate();


    return (
        <ep.EditProfileContainer>
            <s.SignUpWrap>
            <s.SignUpTitle>회원정보 수정</s.SignUpTitle>

                <ep.ProfileImageWrap>
                <ep.ProfileImage isDefault={!userProfileImg}>
                    {userProfileImg ?(
                         <img src={userProfileImg} alt="업로드된 프로필 이미지" />
                    ):(
                        <img src={profileImg} alt="기본 프로필 이미지" />
                    )}
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
                    // 카카오아이디가 있는 경우 (카카오 로그인 시)
                    <ep.ReadOnlyInput type="text" value={email} readOnly />
                ) : (
                    // 로컬로 회원가입 했을 시 
                    <>
                        <ep.EditableInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <s.SignUpDupli>중복 확인</s.SignUpDupli>
                    </>
                )}
            </s.InputRow>

            <s.SignUpLi>휴대폰 번호</s.SignUpLi>
            <s.InputRow as='div'>
                <ep.ReadOnlyInput 
                type="text"
                value={phone}
                readOnly={!isPhoneEditable}
                onChange={(e) => setPhone(e.target.value)}/>
                {isPhoneEditable?(
                    <s.SignUpDupli type="button">중복 확인</s.SignUpDupli>
                ):(
                    <s.SignUpDupli type="button" onClick={() => setIsPhoneEditable(true)}>변경하기</s.SignUpDupli>
                )}
            </s.InputRow>

            <s.SignUpLi>생년월일</s.SignUpLi>
            <s.InputRow>
                <ep.ReadOnlyInput type="text" value="20000101" readOnly />
            </s.InputRow>

            <s.SignUpLi>성별</s.SignUpLi>
            <ep.GenderRow>
            <label>
                <input type="radio" value="female" checked={gender === 'female'} disabled /> 여성
            </label>
            <label>
                <input type="radio" value="male" checked={gender === 'male'} disabled /> 남성
            </label>
            <span>가입 시 선택된 성별은 수정할 수 없습니다.</span>
            </ep.GenderRow>

            <s.SignUpButton onClick={()=>{setIsConfirmOpen(true); setConfirmType('save');}}>저장하기</s.SignUpButton>
            <ep.WithdrawText onClick={() => { setIsConfirmOpen(true); setConfirmType('withdraw'); }}>회원탈퇴</ep.WithdrawText>
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
                    onConfirm={() => {
                        setIsConfirmOpen(false);
                        if (confirmType === 'save') {
                          // 저장 로직 실행
                          setResultMessage('회원정보가 저장되었습니다.');
                        } else if (confirmType === 'withdraw') {
                          // 회원탈퇴 로직 실행
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
                onConfirm={() => 
                    {setIsResultOpen(false);
                        if (confirmType === 'withdraw') {
                            navigate('/');
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