import LV1badge from '../../../assets/images/LV1.png';
import LV2badge from '../../../assets/images/LV2.png';
import LV3badge from '../../../assets/images/LV3.png';
import LV4badge from '../../../assets/images/LV4.png';
import LV5badge from '../../../assets/images/LV5.png';
import * as s from './BadgeGuideStyle';

const BadgeGuide:React.FC = () => {

    const btnClick = () => {

    }

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
                                <s.BadgeName>LV. 1 새싹 교환러</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 0 ~ 50 점</s.ScoreRange>
                                <s.BadgeInfoText>이제 막 교환을 시작한 사용자예요 🌱</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV2badge} alt="뱃지2 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName>LV. 2 덕심 교환러</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 51 ~ 100 점</s.ScoreRange>
                                <s.BadgeInfoText>몇차례 교환을 경험한 열정 있는 팬이에요 💖</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV3badge} alt="뱃지3 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName>LV. 3 굿즈 수호자</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 101 ~ 200 점</s.ScoreRange>
                                <s.BadgeInfoText>후기도 인증도 꼼꼼히! 믿고 거래할 수 있어요 🛡️</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />

                          <s.BadgeInfo>
                            <img src={LV4badge} alt="뱃지4 이미지"/>
                            <s.BadgeInfoGuide>
                                <s.BadgeName>LV. 4 레전드 덕후</s.BadgeName>
                                <s.ScoreRange>점수 범위 : 201 ~ 300 점</s.ScoreRange>
                                <s.BadgeInfoText>교환, 후기 활동이 활발한 베테랑 🙌</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                          <s.StyledHr />
                          
                          <s.BadgeInfo>
                            <img src={LV5badge} alt="뱃지5 이미지"/>
                            <s.BadgeInfoGuide>

                            <s.BadgeName>LV. 5 팬덤 대통령</s.BadgeName>
                            <s.ScoreRange>점수 범위 : 301 ~ 500 점</s.ScoreRange>
                            <s.BadgeInfoText>굿즈 교환계의 전설! 모두가 믿고 따르는 거래왕 👑</s.BadgeInfoText>
                            </s.BadgeInfoGuide>
                          </s.BadgeInfo>
                </s.BadgeGuideBox>

                {/* 버튼 ㅣ 등급 점수는 어떻게 계산되나요?  */}
                <s.GradeScoreCalc>
                    등급 점수는 어떻게 계산되나요?
                </s.GradeScoreCalc>

                {/* 등급 점수 관련 자주 묻는 질문 */}
                <s.GradeScoreFAQ>
                    <s.GradeScoreFAQTitle>
                        FAQ. 등급 점수 관련 자주 묻는 질문
                    </s.GradeScoreFAQTitle>
                        <s.FaqItem>
                            Q. 후기 하나 썼는데 점수가 안올랐어요!
                        </s.FaqItem>

                        <s.FaqItem>
                             Q. 별점을 남겼는데 왜 제 점수엔 반영되지 않나요?
                        </s.FaqItem>

                        <s.FaqItem>
                            Q. 등급 점수는 언제 반영되나요?
                        </s.FaqItem>

                        <s.FaqItem>
                            Q. 작성한 후기나 거래 이력이 사라졌어요. 등급 점수도 사라지나요?
                        </s.FaqItem>

                        <s.FaqItem>
                            Q. 등급이 내려갈 수도 있나요?
                        </s.FaqItem>
                </s.GradeScoreFAQ>
            </s.BadgeGuideWrap>
        </s.BadgeGuideContainer>
    )
}

export default BadgeGuide;