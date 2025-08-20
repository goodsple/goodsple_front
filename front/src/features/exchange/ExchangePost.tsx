
import React, { useEffect, useState } from 'react';
import * as S from './ExchangePost.styles';
import deleteButton from '../../assets/images/delete-button.png'; // 이미지 삭제 버튼 아이콘
import axios from 'axios';


const ExchangePost = () => {

    const accessToken = localStorage.getItem('accessToken');
    // 백엔드 DTO와 필드명이 동일하게 
    interface Category {
        firstCateId: number;
        firstCateName: string;
        secondCateId: number;
        secondCateName: string;
        thirdCateId: number;
        thirdCateName: string;
    }

    // --- State 관리 ---
    const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [parcelOptions, setParcelOptions] = useState({
        normalFee: '',
        halfDetailPrice: '',
        halfOption: '불가능',
        halfDetailOption: '둘다 가능',
    });

    // 이미지 파일을 선택할 때 사용할 상태
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    // 이미지 미리보기를 위한 URL 상태 추가
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // 카테고리 선택을 위한 상태
    const [firstCateId, setFirstCateId] = useState('');
    const [secondCateId, setSecondCateId] = useState('');
    const [thirdCateId, setThirdCateId] = useState('');

    // 백엔드에서 받아온 전체 카테고리 목록
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    // 필터링된 카테고리 목록
    const [filteredSecondCategories, setFilteredSecondCategories] = useState<Category[]>([]);
    const [filteredThirdCategories, setFilteredThirdCategories] = useState<Category[]>([]);

    const [location, setLocation] = useState('');

    // --- 내 위치 버튼 핸들러 ---
    const handleGetMyLocation = () => {
        if (!navigator.geolocation) {
            alert('브라우저가 위치 정보를 지원하지 않습니다.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    // 카카오 좌표→행정동 변환 API 호출
                    const res = await axios.get(
                        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
                        {
                            headers: {
                                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
                            },
                        }
                    );

                    if (res.data.documents && res.data.documents.length > 0) {
                        const region = res.data.documents[0];
                        // ex) 서울특별시 강남구 역삼동
                        const fullAddress = `${region.region_2depth_name} ${region.region_3depth_name}`;
                        setLocation(fullAddress);
                    }
                } catch (err) {
                    console.error('위치 변환 실패:', err);
                    alert('내 위치를 불러오는데 실패했습니다.');
                }
            },
            (err) => {
                console.error(err);
                alert('위치 권한을 허용해야 내 위치를 사용할 수 있습니다.');
            }
        );
    };

    // --- 주소 검색 버튼 핸들러 ---
    const handleSearchAddress = () => {
        new (window as any).daum.Postcode({
            oncomplete: function (data: any) {
                // 전체 주소에서 시/구/동 추출
                // (예: "서울특별시 강남구 역삼동 123-45" → "서울특별시 강남구 역삼동")
                const match = data.address.match(/^[^ ]+시 [^ ]+구 [^ ]+동/);
                const result = match ? match[0] : data.address;
                setLocation(result);
            },
        }).open();
    };


    // 백엔드에서 받아온 카테고리 목록을 저장할 상태(3차는 잘 불러와짐)
    // const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // 이 API 경로는 백엔드에서 카테고리 목록을 제공하는 엔드포인트로 변경해야 합니다.
                // 예를 들어, GET /api/categories 또는 GET /api/categories/list
                const response = await axios.get('http://localhost:8080/api/post-categories');
                setAllCategories(response.data);
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error);
            }
        };
        fetchCategories();
    }, []);

    // --- 핸들러 함수 ---
    const toggleDeliveryMethod = (method: string) => {
        setDeliveryMethods(prev =>
            prev.includes(method)
                ? prev.filter(m => m !== method)
                : [...prev, method]
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const totalSelected = selectedImages.length + files.length;
        if (totalSelected > 5) {
            alert('이미지는 최대 5개까지 등록할 수 있습니다.');
            return;
        }

        // 실제 파일 객체들을 상태에 추가
        setSelectedImages(prev => [...prev, ...files]);

        //  // 미리보기를 위한 URL 생성
        const newImageUrls = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newImageUrls]);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        // 미리보기 URL 상태에서만 제거하고 메모리 누수 방지
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

        // 실제 파일 객체 상태에서도 제거
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    // ⭐️ 1차 카테고리 변경 핸들러
    const handleFirstCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setFirstCateId(selectedId);
        setSecondCateId(''); // 1차 변경 시 2, 3차 초기화
        setThirdCateId('');

        if (selectedId) {
            // 선택된 1차 카테고리에 속하는 2차 카테고리 필터링
            const secondCates = allCategories.filter(
                (category, index, self) =>
                    category.firstCateId === parseInt(selectedId) &&
                    self.findIndex(c => c.secondCateId === category.secondCateId) === index
            );
            setFilteredSecondCategories(secondCates);
            setFilteredThirdCategories([]);
        } else {
            setFilteredSecondCategories([]);
            setFilteredThirdCategories([]);
        }
    };

    // ⭐️ 2차 카테고리 변경 핸들러
    const handleSecondCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSecondCateId(selectedId);
        setThirdCateId(''); // 2차 변경 시 3차 초기화

        if (selectedId) {
            // 선택된 2차 카테고리에 속하는 3차 카테고리 필터링
            const thirdCates = allCategories.filter(
                category => category.secondCateId === parseInt(selectedId)
            );
            setFilteredThirdCategories(thirdCates);
        } else {
            setFilteredThirdCategories([]);
        }
    };

    // ⭐️ 3차 카테고리 변경 핸들러
    const handleThirdCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setThirdCateId(e.target.value);
    };


    // 카테고리 변경 핸들러 (3차 정상적으로 불러옴)
    // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setThirdCateId(e.target.value);
    // };


    // --- 백엔드 통신 로직 ---
    const getTradeType = () => {
        if (deliveryMethods.includes('direct') && deliveryMethods.includes('parcel')) {
            return 'BOTH';
        } else if (deliveryMethods.includes('direct')) {
            return 'DIRECT';
        } else if (deliveryMethods.includes('parcel')) {
            return 'DELIVERY';
        } else {
            return '';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        // 이미지 파일들을 서버에 먼저 업로드하고 URL을 받아오는 로직이 필요합니다.
        // 현재는 `URL.createObjectURL`로 임시 URL을 사용하고 있으므로,
        // 실제 운영 환경에서는 `FormData`를 이용해 파일을 업로드해야 합니다.
        // 여기서는 예시를 위해 `selectedImages` 배열을 그대로 사용합니다.

        // 3차 카테고리가 선택되지 않았으면 알림
        if (!thirdCateId) {
            alert('카테고리를 모두 선택해 주세요.');
            return;
        }

        // 1. FormData 객체 생성
        const formData = new FormData();

        // 2. 이미지 파일들을 FormData에 추가
        selectedImages.forEach((file) => {
            formData.append('file', file);
        });

        let imageUrls = [];
        try {
            // 이미지 파일을 먼저 서버에 업로드하고 URL들을 받아옴
            const imageResponse = await axios.post(
                'http://localhost:8080/api/images/upload', // 이미지 업로드 전용 API 엔드포인트
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            imageUrls = imageResponse.data.imageUrls; // 백엔드에서 이미지 URL 배열을 응답으로 보낸다고 가정
        } catch (error) {
            const axiosError = error as any; // 또는 `AxiosError`
            console.error('이미지 업로드 실패:', axiosError.response.data);
            alert(`이미지 업로드에 실패했습니다: ${axiosError.response.data.message || '알 수 없는 오류'}`);
            return;
        }

        // --- 게시글 데이터 구성 (백엔드 DTO에 맞게 수정) ---
        const tradeType = getTradeType();
        const postData = {
            thirdCateId: thirdCateId ? parseInt(thirdCateId, 10) : null,
            exchangePostTitle: productName,
            postDescription: productDescription,
            // 이 부분은 사용자의 실제 위치 데이터로 대체해야 합니다.
            postLocationCode: '01',
            postLocationName: '서울특별시',
            postHopeRegion: '서울 강남구', // 직거래 시 사용자가 입력한 값
            postTradeType: tradeType,
            deliveryPriceNormal: parcelOptions.normalFee ? parseInt(parcelOptions.normalFee, 10) : null,

            // 반값 택배를 선택했을 때만 금액과 옵션 정보를 전송
            deliveryPriceHalf: (tradeType === 'DELIVERY' || tradeType === 'BOTH') && parcelOptions.halfOption === '가능'
                ? parseInt(parcelOptions.halfDetailPrice, 10) : null,
            halfDeliveryType: (tradeType === 'DELIVERY' || tradeType === 'BOTH') && parcelOptions.halfOption === '가능'
                ? parcelOptions.halfDetailOption : null,

            imageUrls: imageUrls, // 업로드된 이미지 URL 배열 사용
        };


        try {
            const response = await axios.post(
                'http://localhost:8080/api/exchange-posts',
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 사용자 인증 토큰을 여기에 넣으세요.
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('게시글 등록이 완료되었습니다.');
            console.log('등록 성공:', response.data);
            // 성공 시, 페이지 이동 또는 폼 초기화
            // 예: window.location.href = `/posts/${response.data.postId}`;
        } catch (error) {
            const axiosError = error as any;
            console.error('등록 실패:', axiosError.response.data);
            alert(`게시글 등록에 실패했습니다: ${axiosError.response.data.message || '알 수 없는 오류'}`);
        }
    };

    // 1차 카테고리 목록을 중복 없이 추출
    const firstCategories = allCategories.filter(
        (category, index, self) =>
            self.findIndex(c => c.firstCateId === category.firstCateId) === index
    );

    return (
        <S.Container>
            <S.Title>상품등록</S.Title>
            <S.Divider />

            <S.SectionRow>
                <S.Label>카테고리 등록</S.Label>
                <S.CategoryGrid>
                    {/* 3차 카테고리 선택을 위한 셀렉트 박스*/}
                    {/* {categories.length > 0 && (
                        <S.Select onChange={handleFirstCategoryChange} value={thirdCateId}>
                            <option value="">카테고리 선택</option>
                            {categories.map(category => (
                                <option key={category.thirdCateId} value={category.thirdCateId}>
                                    {category.thirdCateName}
                                </option>
                            ))}
                        </S.Select>
                    )} */}

                    {/* ⭐️ 1차 카테고리 드롭다운 */}
                    <S.Select onChange={handleFirstCategoryChange} value={firstCateId}>
                        <option value="">1차 카테고리 선택</option>
                        {firstCategories.map(category => (
                            <option key={category.firstCateId} value={category.firstCateId}>
                                {category.firstCateName}
                            </option>
                        ))}
                    </S.Select>

                    {/* ⭐️ 2차 카테고리 드롭다운 (1차 선택 시 활성화) */}

                    <S.Select onChange={handleSecondCategoryChange} value={secondCateId}>
                        <option value="">{firstCateId ? '2차 카테고리 선택' : '1차 카테고리 선택하세요.'}</option>
                        {filteredSecondCategories.map(category => (
                            <option key={category.secondCateId} value={category.secondCateId}>
                                {category.secondCateName}
                            </option>
                        ))}
                    </S.Select>


                    {/* ⭐️ 3차 카테고리 드롭다운 (2차 선택 시 활성화) */}

                    <S.Select onChange={handleThirdCategoryChange} value={thirdCateId}>
                        <option value="">{secondCateId ? '3차 카테고리 선택' : '2차 카테고리 선택하세요.'}</option>
                        {filteredThirdCategories.map(category => (
                            <option key={category.thirdCateId} value={category.thirdCateId}>
                                {category.thirdCateName}
                            </option>
                        ))}
                    </S.Select>


                </S.CategoryGrid>
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>상품명</S.Label>
                <S.InputWrapper>
                    <S.Input
                        placeholder="상품명을 입력해 주세요."
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        maxLength={40}
                    />
                    <S.CharCount>{productName.length}/40</S.CharCount>
                </S.InputWrapper>
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>상품 설명</S.Label>
                <S.TextAreaWrapper>
                    <S.TextArea
                        placeholder="- 상품상태, 구성품, 특이사항 등을 상세하게 작성해 주세요.
• K-POP: 포토카드 포함 여부, 초회판/통상판 구분, 개봉 여부
• 애니메이션/게임/영화: 정품 여부, 패키지 구성, 기스/오염 유무

정확한 정보는 원활한 교환에 도움이 됩니다. 😊"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        maxLength={2000} />
                    <S.CharCount>{productDescription.length}/2000</S.CharCount>
                </S.TextAreaWrapper>
            </S.SectionRow>

            <S.SectionRow>
                <S.Label>이미지 등록 (필수)</S.Label>
                <S.ImagePreviewWrapper>
                    {imagePreviews.map((imageUrl, index) => (
                        <S.ImageBox key={index}>
                            <img src={imageUrl} alt={`preview-${index}`} />
                            <S.DeleteButton
                                type="button"
                                onClick={() => handleRemoveImage(index)}>
                                ×</S.DeleteButton>
                        </S.ImageBox>
                    ))}
                    <S.Input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </S.ImagePreviewWrapper>
            </S.SectionRow>

            <S.LocationSectionRow>
                <S.Label>내 위치</S.Label>
                <S.ButtonRow>
                    <S.Button type='button' onClick={handleGetMyLocation}>
                        내 위치
                    </S.Button>
                    <S.Button type="button" onClick={handleSearchAddress}>
                        주소 검색
                    </S.Button>
                </S.ButtonRow>
            </S.LocationSectionRow>
            <S.LocationInputWrapper>
                <S.AutoFilledInput
                    placeholder="지역을 설정해 주세요."
                    value={location}
                    readOnly />
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

            <button type="submit" onClick={handleSubmit} >등록하기</button>
        </S.Container>
    );
};

export default ExchangePost;
