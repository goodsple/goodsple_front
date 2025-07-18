import { useState } from 'react';
import * as s from './SignUpStyle';
import * as k from './KakaoStyle';

const KakaoInfo:React.FC = () => {

    const [showServiceTerms, setShowServiceTerms] = useState(false);
    const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);
    const [showLocationTerms, setShowLocationTerms] = useState(false);
    const [showMarketingTerms, setShowMarketingTerms] = useState(false);

    
    return(
        <s.SignUpContainer>
            <s.SignUpWrap>
                <s.SignUpTitle>추가정보</s.SignUpTitle>

                <k.KakaoInfoGuide>
                👋 카카오 로그인 완료!<br/>서비스 이용을 위해 추가 정보를 입력해주세요!
                </k.KakaoInfoGuide>
                <s.SignUpForm>
                   
                    <s.SignUpLi>닉네임</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='nickname'
                        placeholder='닉네임을 입력해주세요.'/>
                        <s.SignUpDupli>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    
                    <s.SignUpLi>이름</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='text'
                        name='name'
                        placeholder='이름을 입력해주세요.'/>
                    </s.InputRow>
                    
                    <s.SignUpLi>이메일</s.SignUpLi>
                    <s.InputRow>
                        <k.ReadOnlyInput
                        type='text'
                        name='email'
                        placeholder='이메일을 입력해주세요.'/>
                    </s.InputRow>
                    
                    <s.SignUpLi>휴대폰 번호</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='number'
                        name='phoneNumber'
                        placeholder='휴대폰 번호를 입력해주세요.'/>
                        <s.SignUpDupli>중복확인</s.SignUpDupli>
                    </s.InputRow>
                    
                    <s.SignUpLi>생년월일</s.SignUpLi>
                    <s.InputRow>
                        <s.SignUpInput
                        type='date'
                        name='birthDate'
                    />
                    </s.InputRow>
                    
                     <s.SignUpLi>성별</s.SignUpLi>
                     <s.InputRow>
                        <s.RadioGroup>
                            <label><input type="radio" name="gender" value="female" /> 여성</label>
                            <label><input type="radio" name="gender" value="male" /> 남성</label>
                        </s.RadioGroup>
                     </s.InputRow>
                   
                    {/* <s.SignUpLi>약관 동의</s.SignUpLi> */}
                    <s.CheckboxGroup>
                        <label><input type="checkbox" /> 전체 동의</label>
                        <label><input type="checkbox" /> 서비스 이용약관 동의 (필수)
                        <button type="button" onClick={() => setShowServiceTerms(!showServiceTerms)}>내용보기</button>
                        </label>
                        {showServiceTerms && (
                        <s.TermsContent>
                            제1조 (목적)  이 약관은 GoodsPle(이하 "회사")가 운영하는 웹사이트 및 모바일 서비스를 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br/>
                            제2조 (정의)<br/>
                            "서비스"란 회사가 제공하는 굿즈 거래·교환 관련 플랫폼 일체를 말합니다.<br/>
                            "회원"이란 본 약관에 따라 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를 의미합니다.<br/>
                            "게시물"이란 회원이 서비스 내에 업로드한 문자, 사진, 동영상, 파일, 링크 등을 포함한 모든 콘텐츠를 의미합니다.<br/>
                            "아이디(ID)"란 회원 식별 및 서비스 이용을 위하여 회원이 설정한 문자와 숫자의 조합을 의미합니다.<br/>
                            "비밀번호"란 회원이 설정한 아이디와 일치하는지를 확인하고, 회원의 개인정보 보호를 위해 설정한 문자 또는 숫자의 조합을 말합니다.<br/>
                            제3조 (약관의 효력 및 변경)<br/>
                            이 약관은 회원이 동의한 후 회사가 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력을 발생합니다.<br/>
                            회사는 관계 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 개정 시 사전 공지합니다.<br/>
                            개정 약관에 동의하지 않을 경우 회원은 서비스 이용을 중단하고 탈퇴할 수 있습니다.<br/>
                            제4조 (회원가입)<br/>
                            회원가입은 이용자가 본 약관에 동의하고, 회사가 정한 절차에 따라 회원 정보를 입력한 후 가입신청을 완료하면 회사가 이를 승인함으로써 성립됩니다.<br/>
                            회사는 다음 각 호에 해당하는 경우 회원가입을 거절하거나 취소할 수 있습니다.<br/>
                            실명이 아닌 경우<br/>
                            타인의 정보를 도용한 경우<br/>
                            가입 신청 시 허위 정보를 기재한 경우<br/>
                            기타 회사가 정한 기준에 부합하지 않을 경우<br/>
                            제5조 (서비스의 이용)<br/>
                            서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br/>
                            회사는 시스템 점검, 유지보수, 서비스 개편 등의 사유로 서비스의 전부 또는 일부를 일시 중단할 수 있으며, 이 경우 사전에 공지합니다.<br/>
                            제6조 (회원의 의무)<br/>
                            회원은 본 약관 및 관계 법령을 준수하여야 하며, 다음 각 호의 행위를 해서는 안 됩니다.<br/>
                            타인의 개인정보 도용<br/>
                            불법적 또는 부적절한 거래 시도<br/>
                            욕설, 비방, 음란물 게시 등 건전한 커뮤니티 질서 훼손<br/>
                            서비스 운영을 방해하는 행위<br/>
                            제7조 (게시물의 관리)<br/>
                            회원이 작성한 게시물에 대한 책임은 해당 회원에게 있으며, 회사는 서비스 내 질서 유지 및 법적 위반 요소 차단을 위해 게시물을 사전/사후 검토 및 삭제할 수 있습니다.<br/>
                            다음의 게시물은 사전 통보 없이 삭제될 수 있습니다.<br/>
                            명예훼손, 음란, 혐오, 차별, 범죄 유발 등의 내용을 포함한 경우<br/>
                            타인의 저작권, 초상권 등을 침해한 경우<br/>
                            허위 매물, 사기 유도성 게시물<br/>
                            서비스 목적과 무관한 광고성 콘텐츠<br/>
                            제8조 (계약 해지 및 탈퇴)<br/>
                            회원은 언제든지 서비스 내 [회원탈퇴] 기능을 통해 탈퇴할 수 있습니다.<br/>
                            탈퇴 후에도 법령에 따른 보관 의무가 있는 정보는 일정 기간 보관될 수 있습니다.<br/>
                            회사는 회원이 본 약관을 위반하거나 사회질서에 반하는 행위를 하는 경우, 사전 통보 없이 이용을 제한하거나 탈퇴 처리할 수 있습니다.<br/>
                            제9조 (면책조항)<br/>
                            회사는 다음 각 호의 사유로 발생한 손해에 대해 책임을 지지 않습니다.<br/>
                            회원 본인의 부주의로 인한 정보 유출<br/>
                            회원 간 거래 과정에서 발생한 분쟁<br/>
                            천재지변 또는 불가항력으로 인한 서비스 장애<br/>
                            회사는 회원 간의 교환, 판매 등 거래의 당사자가 아니며, 거래의 법적 책임은 거래 당사자에게 있습니다.<br/>
                            제10조 (지적재산권)<br/>
                            서비스에 포함된 디자인, 텍스트, 이미지 등 모든 콘텐츠의 저작권은 회사 또는 해당 콘텐츠 제공자에게 있으며, 무단 복제·배포·전송을 금지합니다.<br/>
                            회원이 서비스에 게시한 콘텐츠는 해당 회원에게 저작권이 있으나, 회사는 해당 콘텐츠를 서비스 홍보, 개선 등을 위해 사용할 수 있습니다(단, 비상업적 사용에 한함).<br/>
                            제11조 (준거법 및 재판관할)<br/>
                            이 약관은 대한민국 법률에 따라 해석됩니다.<br/>
                            서비스 이용과 관련하여 발생한 분쟁에 대해서는 회사 본사 소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.<br/>
                            📌 부칙  본 약관은 2025년 7월 12일부터 적용됩니다.
                        </s.TermsContent>
                        )}
                        <label><input type="checkbox" /> 개인정보 수집 및 이용 동의 (필수)
                        <button type="button" onClick={() => setShowPrivacyTerms(!showPrivacyTerms)}>내용보기</button>
                        </label>
                        {showPrivacyTerms && (
                        <s.TermsContent>
                            1. 수집 항목:<br/>
                            - 아이디, 비밀번호, 이름, 닉네임, 이메일, 휴대전화 번호, 생년월일, 성별<br/>
                            2. 수집 목적:  <br/>
                            - 회원 식별 및 본인 확인, 서비스 제공 및 개선, 고객 상담 및 민원 처리<br/>
                            3. 보유 및 이용기간:  <br/>
                            - 회원 탈퇴 시까지 보관하며, 관련 법령에 따라 일정 기간 보관 후 파기함<br/>
                            ※ 귀하는 개인정보 수집 및 이용에 대해 동의를 거부할 수 있으며, 이 경우 서비스 이용이 제한될 수 있습니다.
                        </s.TermsContent>
                        )}
                        <label><input type="checkbox" /> 위치기반서비스 이용 동의 (선택)
                        <button type="button" onClick={() => setShowLocationTerms(!showLocationTerms)}>내용보기</button>
                        </label>
                        {showLocationTerms && (
                        <s.TermsContent>
                            1. 위치정보의 수집 방법:  <br/>
                            - 모바일 기기 또는 브라우저에서 제공하는 위치정보 시스템(GPS, Wi-Fi 등)을 통해 수집됩니다.<br/>
                            2. 이용 목적:  <br/>
                            - 내 주변의 교환글 표시, 사용자 간 거리 기반 매칭 기능 제공<br/>
                            3. 보유 및 이용기간: <br/> 
                            - 이용 목적 달성 후 즉시 파기함. 단, 관련 법령에 따라 일정 기간 보관할 수 있음.<br/>
                            ※ 위치정보 수집을 원하지 않으실 경우, 기기 설정을 통해 위치 접근 권한을 차단할 수 있습니다.
                        </s.TermsContent>
                        )}
                        <label><input type="checkbox" /> 마케팅 정보 수신 동의 (선택)
                        <button type="button" onClick={() => setShowMarketingTerms(!showMarketingTerms)}>내용보기</button>
                        </label>
                        {showMarketingTerms && (
                        <s.TermsContent>
                            1. 수신 목적:  <br/>
                            - 굿즈 관련 이벤트, 프로모션, 신규 기능 업데이트 안내<br/>
                            2. 수단:  <br/>
                            - 이메일, 문자(SMS), 앱 푸시 알림 등<br/>
                            3. 보유 및 이용기간:  <br/>
                            - 수신 동의 철회 시까지<br/>
                            ※ 사용자는 언제든지 수신 거부를 선택할 수 있습니다.
                        </s.TermsContent>
                        )}
                    </s.CheckboxGroup>

                    <s.SignUpButton>가입하기</s.SignUpButton>
                </s.SignUpForm>
            </s.SignUpWrap>
        </s.SignUpContainer>
    )
}
export default KakaoInfo;