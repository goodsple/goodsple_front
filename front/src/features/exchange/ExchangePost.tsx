
import React, { useState } from 'react';
import * as S from './ExchangePost.styles';

const ExchangePost = () => {
    const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);
    const [parcelOptions, setParcelOptions] = useState({
        normal: false,
        half: false,
        normalFee: '',
        halfFee: '',
        halfOption: '불가능',
        halfDetailOption: '둘다 가능', // 새로 추가
        halfDetailPrice: 'GS25만 가능',
        halfDetailPriceValue: 'CU만 가능',
    });

    const toggleDeliveryMethod = (method: string) => {
        setDeliveryMethods(prev =>
            prev.includes(method)
                ? prev.filter(m => m !== method) // 선택 해제
                : [...prev, method] // 선택 추가
        );
    };

    return (
        <S.Container>
            <S.Title>상품등록</S.Title>
            <S.Divider />

            <S.SectionRow>
                <S.Label>카테고리 등록</S.Label>
                <S.CategoryGrid>
                    <S.Select />
                    <S.Select />
                    <S.Select />
                    <S.Select />
                </S.CategoryGrid>
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>상품명</S.Label>
                <S.Input placeholder="상품명을 입력해 주세요." />
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>상품 설명</S.Label>
                <S.TextArea placeholder="- 상품상태, 구성품, 특이사항 등을 상세하게 작성해 주세요.
• K-POP: 포토카드 포함 여부, 초회판/통상판 구분, 개봉 여부
• 애니메이션/게임/영화: 정품 여부, 패키지 구성, 기스/오염 유무

정확한 정보는 원활한 교환에 도움이 됩니다. 😊" />
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>이미지 등록 (필수)</S.Label>
                <S.Input type="file" accept="image/*" multiple />
            </S.SectionRow>

            <S.LocationSectionRow>
                <S.Label>내 위치</S.Label>
                <S.ButtonRow>
                    <S.Button>내 위치</S.Button>
                    <S.Button>주소 검색</S.Button>
                </S.ButtonRow>
            </S.LocationSectionRow>
            <S.LocationInputWrapper>
                <S.AutoFilledInput placeholder="지역을 설정해 주세요." readOnly />
            </S.LocationInputWrapper>



            <S.SectionRow>
                <S.Label>거래 방식</S.Label>
                <S.ButtonRow>
                    <S.ToggleButton
                        selected={deliveryMethods.includes('direct')}
                        onClick={() => toggleDeliveryMethod('direct')}
                    >
                        직거래
                    </S.ToggleButton>
                    <S.ToggleButton
                        selected={deliveryMethods.includes('parcel')}
                        onClick={() => toggleDeliveryMethod('parcel')}
                    >
                        택배거래
                    </S.ToggleButton>
                </S.ButtonRow>
            </S.SectionRow>

            {deliveryMethods.includes('direct') && (
                <S.DirectTradeInputWrapper>
                    <S.SubLabel>직거래</S.SubLabel>
                    <S.Divider />
                    <S.SectionRow>
                        <S.Label>거래 희망 장소</S.Label>
                        <S.Input placeholder="거래 희망 장소를 입력해 주세요. 예) 강남역 1번 출구 앞" />
                    </S.SectionRow>
                </S.DirectTradeInputWrapper>
            )}

            {deliveryMethods.includes('parcel') && (
                <S.ParcelTradeWrapper>
                    <S.SubLabel>택배거래</S.SubLabel>
                    <S.Divider />
                    <S.SectionRow>

                        <S.Label>배송비 설정</S.Label>
                        <S.Box>
                            <S.ParcelRow>
                                <span>일반택배(필수)</span>
                                <S.AmountInput
                                    type="number"
                                    placeholder="금액 입력"
                                    value={parcelOptions.normalFee}
                                    onChange={e =>
                                        setParcelOptions(prev => ({ ...prev, normalFee: e.target.value }))
                                    }
                                    />
                                    <span>원</span>
                            </S.ParcelRow>

                            <S.ParcelRow>
                                <span>GS반값・CU알뜰택배(선택)</span>
                                <S.RadioGroup>
                                    <label>
                                        <input
                                            type="radio"
                                            name="halfOption"
                                            value="가능"
                                            checked={parcelOptions.halfOption === '가능'}
                                            onChange={e =>
                                                setParcelOptions(prev => ({ ...prev, halfOption: e.target.value }))
                                            }
                                        />
                                        가능
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="halfOption"
                                            value="불가능"
                                            checked={parcelOptions.halfOption === '불가능'}
                                            onChange={e =>
                                                setParcelOptions(prev => ({ ...prev, halfOption: e.target.value }))
                                            }
                                        />
                                        불가능
                                    </label>
                                </S.RadioGroup>
                            </S.ParcelRow>

                            {parcelOptions.halfOption === '가능' && (
                                <S.ConditionalOptions>
                                    <S.Select
                                        value={parcelOptions.halfDetailOption}
                                        onChange={e =>
                                            setParcelOptions(prev => ({ ...prev, halfDetailOption: e.target.value }))
                                        }
                                    >
                                        <option value="둘다 가능">둘다 가능</option>
                                        <option value="GS25">GS25만 가능</option>
                                        <option value="CU">CU만 가능</option>
                                    </S.Select>

                                    <S.AmountInputWrapper>
                                        <S.AmountInput
                                            type="number"
                                            placeholder="금액 입력"
                                            value={parcelOptions.halfDetailPrice}
                                            onChange={e =>
                                                setParcelOptions(prev => ({ ...prev, halfDetailPrice: e.target.value }))
                                            }
                                        />
                                        <span>원</span>
                                    </S.AmountInputWrapper>
                                </S.ConditionalOptions>
                            )}
                        </S.Box>
                    </S.SectionRow>
                </S.ParcelTradeWrapper>
            )}
        </S.Container>
    );
};

export default ExchangePost;
