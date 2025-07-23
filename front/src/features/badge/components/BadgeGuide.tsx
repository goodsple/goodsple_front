import { useState } from 'react';
import LV1badge from '../../../assets/images/LV1.png';
import LV2badge from '../../../assets/images/LV2.png';
import LV3badge from '../../../assets/images/LV3.png';
import LV4badge from '../../../assets/images/LV4.png';
import LV5badge from '../../../assets/images/LV5.png';
import * as s from './BadgeGuideStyle';

const BadgeGuide:React.FC = () => {

    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const [isFaqOpen, setIsFapOpen] = useState(false);

    const toggleCalcInfo = () => {
        setIsCalcOpen(prev => !prev);
    };

    // const toggleFaqInfo = () => {
    //     setIsFaqOpen(prev => !prev);
    // };

    

    return (
        <s.BadgeGuideContainer> 
            <s.BadgeGuideWrap>

                {/* 내 등급에 맞는 뱃지 */}
                <s.MyBadgeInfoBox>
                            <s.BadgeCard>
                                <img src={LV1badge} alt="뱃지 이미지"/>
                                <s.MyBadgeInfo>
                                    <s.BadgeName><b>LV1.</b> 새싹 교환러</s.BadgeName>
                                    <s.BadgeScore><b>20</b> 점</s.BadgeScore>
                                </s.MyBadgeInfo>
                            </s.BadgeCard>

                            <s.GaugeBar>
                                <s.GaugeFill percent={70} />
                            </s.GaugeBar>

                            <s.NextBadgeGap>
                                팬덤 대통령까지 51점 남았습니다!!
                            </s.NextBadgeGap>

                </s.MyBadgeInfoBox>

                {/* 등급 단계별 뱃지 소개 ?  */}
                <s.BadgeGuideBox>
                          <s.BadgeInfo>
                            <img src={LV1badge} alt="뱃지1 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName><b>LV. 1</b> 새싹 교환러</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 0 ~ 50 점</s.ScoreRange>
                                <s.BadgeInfoText>이제 막 교환을 시작한 사용자예요 🌱</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV2badge} alt="뱃지2 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName><b>LV. 2</b> 덕심 교환러</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 51 ~ 100 점</s.ScoreRange>
                                <s.BadgeInfoText>몇차례 교환을 경험한 열정 있는 팬이에요 💖</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV3badge} alt="뱃지3 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName><b>LV. 3</b> 굿즈 수호자</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 101 ~ 200 점</s.ScoreRange>
                                <s.BadgeInfoText>후기도 인증도 꼼꼼히! 믿고 거래할 수 있어요 🛡️</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV4badge} alt="뱃지4 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName><b>LV. 4</b> 레전드 덕후</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 201 ~ 300 점</s.ScoreRange>
                                <s.BadgeInfoText>교환, 후기 활동이 활발한 베테랑 🙌</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />
                          
                          <s.BadgeInfo>
                            <img src={LV5badge} alt="뱃지5 이미지"/>
                            <s.BadgeInfoGuide>

                            <s.BadgeName><b>LV. 5</b> 팬덤 대통령</s.BadgeName>
                            <s.ScoreRange>점수 범위 : 301 ~ 500 점</s.ScoreRange>
                            <s.BadgeInfoText>굿즈 교환계의 전설! 모두가 믿고 따르는 거래왕 👑</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                </s.BadgeGuideBox>

                {/* 버튼 ㅣ 등급 점수는 어떻게 계산되나요?  */}
                <s.GradeScoreCalc onClick={toggleCalcInfo}>
                    등급 점수는 어떻게 계산되나요?
                </s.GradeScoreCalc> {/* 버튼이라는걸 인지해주기 위해 마우스호버를 하면 색깔이 변하는 css를 추가해주면 좋을듯? */}

                {isCalcOpen && (
                    <s.CalcInfo>
                        <s.CalcInfoText>
                        굿즈플의 교환러 등급은 후기, 거래 활동, 인증 노력 등을 바탕으로 점수가 누적되며,
                        누적된 점수에 따라 자동으로 등급이 올라갑니다.
                        </s.CalcInfoText>

                        <s.CalcInfoText>
                            <b>신뢰도 점수</b>
                            별점 평가 : 1 ~ 5점 ( 게시글 작성자에게 주는 점수 )
                        </s.CalcInfoText>

                        <s.CalcInfoText>
                            <b>후기 점수</b>
                            후기 텍스트 50 자 이상 : + 1점
                            사진 첨부 1장 이상 시 추가 점수 
                            <ul>
                                <li>1장 : +2점</li>
                                <li>2장 : +3점</li>
                                <li>3장 : +4점</li>
                                <li>4장 이상 : +5점 (최대)</li>
                            </ul>
                        </s.CalcInfoText>

                        <s.CalcInfoText>
                            <b>거래 활동 점수</b>
                            거래 1건 완료 시 : + 5점
                            한달 내 3건 이상 거래 시 : +5점
                            응답 빠른 거래(3일 이내) : +3점
                        </s.CalcInfoText>

                        <s.CalcInfoText>
                            <b>신뢰 감점</b>
                            운영정책 위반(후기 등) : -10점  
                            운영정책 위반(허위 게시글) : -15점 
                        </s.CalcInfoText>
                    </s.CalcInfo>
                )}

                {/* 등급 점수 관련 자주 묻는 질문 */}
                <s.GradeScoreFAQ> {/* 마우스를 올렸을때 각각의 답변이 뜨게끔 구현하기 */}
                    <s.GradeScoreFAQTitle>
                        FAQ. 등급 점수 관련 자주 묻는 질문
                    </s.GradeScoreFAQTitle>

                        <s.FaqItem> {/* onmouseover 로 넣기 */}
                            Q. 후기 하나 썼는데 점수가 안올랐어요!
                        </s.FaqItem>
                        <s.FaqAnswer>
                            후기를 작성 시 조건을 충족해야 점수가 반영됩니다. 
                            등급 점수 계산 항목을 확인 부탁드려요.  
                        </s.FaqAnswer>
                        {/* ----- */}
                        <s.FaqItem>
                             Q. 별점을 남겼는데 왜 제 점수엔 반영되지 않나요?
                        </s.FaqItem>
                        <s.FaqAnswer>
                            별점은 “게시글 작성자”에게 부여되는 점수입니다.
                            후기를 남긴 사람이 아니라, 별점을 받은 상대방의 등급 점수에만 반영됩니다.
                        </s.FaqAnswer>
                        {/* ----- */}
                        <s.FaqItem>
                            Q. 등급 점수는 언제 반영되나요?
                        </s.FaqItem>
                        <s.FaqAnswer>
                            거래가 “완료 처리된 후” 후기 작성되면 실시간으로 점수가 반영됩니다.
                        </s.FaqAnswer>
                        {/* ----- */}
                        <s.FaqItem>
                            Q. 작성한 후기나 거래 이력이 사라졌어요. 등급 점수도 사라지나요?
                        </s.FaqItem>
                        <s.FaqAnswer>    
                            네. 후기 삭제, 거래 취소, 신고 반려 등의 사유가 있을 경우 관련 점수는 회수됩니다.
                        </s.FaqAnswer>
                        {/* ----- */}
                        <s.FaqItem>
                            Q. 등급이 내려갈 수도 있나요?
                        </s.FaqItem>
                        <s.FaqAnswer> 
                            네. 신고/반려가 누적되면 점수가 차감되어 등급이 하락할 수 있어요.
                        </s.FaqAnswer>

                </s.GradeScoreFAQ>
            </s.BadgeGuideWrap>
        </s.BadgeGuideContainer>
    )
}

export default BadgeGuide;