import React, { useRef, useState } from 'react';
import * as S from './ExchangePostDetail.styles';
import locationIcon from '../../assets/images/placeholder.png';
import deliveryIcon from '../../assets/images/shipping-fee.png';
import bookmarkIcon from '../../assets/images/bookmarkIcon.png';
import chatIcon from '../../assets/images/chatIcon.png';
import lineIcon from '../../assets/images/line_purple.png';
import sample1 from '../../assets/images/sample1.png';
import sample2 from '../../assets/images/sample2.png';
import sample3 from '../../assets/images/sample3.png';

const loginUserId = 1;  // 로그인 사용자 ID (임시)
const postWriterId = 0; // 게시글 작성자 ID (임시)

const mockImages = [sample1, sample2, sample3];

const ExchangePostDetail = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.clientWidth;
        const index = Math.round(scrollLeft / width);
        setCurrentIndex(index);
    };

    const scrollToIndex = (index: number) => {
        if (sliderRef.current) {
            const width = sliderRef.current.clientWidth;
            sliderRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    return (
        <S.Container>
            <S.TopSection>
                {/* 왼쪽 이미지 슬라이더 */}
                <S.ImageSliderWrapper>
                    <S.ImageSlider ref={sliderRef} onScroll={handleScroll}>
                        {mockImages.map((src, idx) => (
                            <S.SlideImage
                                key={idx}
                                src={src}
                                alt={`image-${idx}`} />
                        ))}
                    </S.ImageSlider>

                    <S.IndicatorWrapper>
                        {mockImages.map((_, idx) => (
                            <S.IndicatorDot
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                active={currentIndex === idx} />
                        ))}
                    </S.IndicatorWrapper>
                </S.ImageSliderWrapper>

                {/* 오른쪽 정보 섹션 */}
                <S.RightInfoSection>
                    <S.TitleRow>
                        <S.Category>카테고리명</S.Category>
                        <S.Title>상품명</S.Title>
                        <S.StatusInfo>찜 0 · 조회수 0 · 줄서기 0 · 5분 전</S.StatusInfo>
                    </S.TitleRow>

                    {/* 태그 */}
                    <S.TagWrapper>
                        <S.Tag>직거래</S.Tag>
                        <S.Tag>택배거래</S.Tag>
                    </S.TagWrapper>

                    {/* 직거래 / 배송비 */}
                    <S.DetailBoxWrapper>
                        <S.DetailBox>
                            <S.BoxTitle>
                                <S.BoxIcon src={locationIcon} alt="직거래 희망지역 아이콘" />
                                직거래 희망지역
                            </S.BoxTitle>
                            <S.BoxContent>무악재역 4번 출구 앞</S.BoxContent>
                        </S.DetailBox>

                        <S.DetailBox>
                            <S.BoxTitle>
                                <S.BoxIcon src={deliveryIcon} alt="배송비 아이콘" />
                                배송비
                            </S.BoxTitle>
                            <S.BoxContent>일반 - 3,000원</S.BoxContent>
                            <S.BoxContent>GS반값 • CU알뜰 - 1,500원</S.BoxContent>
                        </S.DetailBox>
                    </S.DetailBoxWrapper>

                    {/* 버튼 */}
                    {loginUserId === postWriterId ? (
                        <S.ManageButton>내 거래글 관리</S.ManageButton>
                    ) : (
                        <S.ButtonGroup>
                            <S.ActionButton>
                                <img src={bookmarkIcon} alt="찜하기 아이콘" />
                                찜하기
                            </S.ActionButton>
                            <S.ActionButton $main>
                                <img src={chatIcon} alt="채팅하기 아이콘" />
                                채팅하기
                            </S.ActionButton>
                            <S.ActionButton>
                                <img src={lineIcon} alt="줄서기 아이콘" />
                                줄서기
                            </S.ActionButton>
                        </S.ButtonGroup>
                    )}

                </S.RightInfoSection>
            </S.TopSection>

            {/* <S.Divider /> */}

            <S.WriterSection>
                <S.WriterProfile>
                    <S.ProfileImage />
                    <div>
                        <S.WriterName>닉네임</S.WriterName>
                        <S.WriterLevel>Lv.1 새싹 교환러</S.WriterLevel>
                    </div>
                </S.WriterProfile>
            </S.WriterSection>
            <S.Divider />

            <S.Content>
                1번포카 4장 나왔어요 ㅠㅠ <br />
                2~4번 포카랑 교환하실 분 연락주세요!! <br />
                제발요~~~🥺🥺🥺
            </S.Content>
            <S.Divider />
        </S.Container>
    );
};

export default ExchangePostDetail;
