
import React, { useEffect, useState } from 'react';
import * as S from './ExchangePost.styles';
import axios from 'axios';

// 백엔드 DTO와 필드명이 동일하게 
interface Category {
    firstCateId: number;
    firstCateName: string;
    secondCateId: number;
    secondCateName: string;
    thirdCateId: number;
    thirdCateName: string;
}

const ExchangePost = () => {
    const accessToken = localStorage.getItem('accessToken');

    // 백엔드에서 받아온 전체 카테고리 목록
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    // 1차, 2차, 3차 카테고리 선택 상태
    const [firstCateId, setFirstCateId] = useState('');
    const [secondCateId, setSecondCateId] = useState('');
    const [thirdCateId, setThirdCateId] = useState('');
    // 필터링된 카테고리 목록
    const [filteredSecondCategories, setFilteredSecondCategories] = useState<Category[]>([]);
    const [filteredThirdCategories, setFilteredThirdCategories] = useState<Category[]>([]);

    // 상품명, 상품설명
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

    // 이미지 파일을 선택할 때 사용할 상태
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    // 이미지 미리보기를 위한 URL 상태 추가
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);
    const [parcelOptions, setParcelOptions] = useState({
        normalFee: '',
        halfDetailPrice: '',
        halfOption: '불가능',
        halfDetailOption: '둘다 가능',
    });

    const [location, setLocation] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [directTradePlace, setDirectTradePlace] = useState(''); // 직거래 장소 입력 상태

    // 카테고리 불러오기
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

    // 1차 카테고리 변경 핸들러
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

    // 2차 카테고리 변경 핸들러
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

    // 3차 카테고리 변경 핸들러
    const handleThirdCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setThirdCateId(e.target.value);
    };

    // --- 이미지 업로드 핸들러 ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const totalSelected = selectedImages.length + files.length;
        // 선택된 이미지가 5개를 초과하면 경고 메시지 표시

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

    // --- 이미지 제거 핸들러 ---
    const handleRemoveImage = (indexToRemove: number) => {
        // 미리보기 URL 상태에서만 제거하고 메모리 누수 방지
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

        // 실제 파일 객체 상태에서도 제거
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

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
                    const res = await axios.get('http://localhost:8080/api/location/region', {
                        params: { latitude, longitude }
                    });

                    if (res.data.documents && res.data.documents.length > 0) {
                        const region = res.data.documents[0];
                        // 시/구/동만 합치기
                        const fullAddress = `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
                        setLocation(fullAddress);

                        setLocationCode(region.code); // region.code가 실제 행정동 코드라고 가정
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
            oncomplete: async function (data: any) {
                try {
                    // 1. 시/구/동 추출
                    const city = data.sido;        // 시/도
                    const district = data.sigungu; // 시/군/구
                    const dong = data.bname;       // 읍/면/동
                    const simpleAddress = `${city} ${district} ${dong}`;

                    // 2. 주소 → 좌표 변환 (백엔드 API 호출)
                    const coordRes = await axios.get("http://localhost:8080/api/location/coord", {
                        params: { address: simpleAddress },
                    });
                    const { latitude, longitude } = coordRes.data;

                    // 3. 좌표 → 행정동 코드 조회
                    const regionRes = await axios.get("http://localhost:8080/api/location/region", {
                        params: { latitude, longitude },
                    });

                    if (regionRes.data.documents && regionRes.data.documents.length > 0) {
                        const region = regionRes.data.documents[0];
                        const fullAddress = `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;

                        // 4. state 업데이트
                        setLocation(fullAddress);          // "서울특별시 중랑구 면목동"
                        setLocationCode(region.code);      // "1138010200"
                    }
                } catch (error) {
                    console.error("주소 검색 처리 실패:", error);
                    alert("선택한 주소를 변환하는 데 실패했습니다.");
                }
            },
        }).open();
    };

    // --- 거래 방식 토글 핸들러 ---
    const toggleDeliveryMethod = (method: string) => {
        setDeliveryMethods(prev =>
            prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
        );
    };


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

        // 3차 카테고리가 선택되지 않았으면 알림
        if (!thirdCateId) {
            alert('카테고리를 모두 선택해 주세요.');
            return;
        }

        if (!productName.trim()) {
            alert('상품명을 입력해 주세요.');
            return;
        }

        if (!productDescription.trim()) {
            alert('상품 설명을 입력해 주세요.');
            return;
        }

        if (selectedImages.length === 0) {
            alert('이미지를 1장 이상 등록해 주세요.');
            return;
        }

        if (!location.trim()) {
            alert('지역을 설정해 주세요.');
            return;
        }

        if (deliveryMethods.length === 0) {
            alert('거래 방식을 선택해 주세요.');
            return;
        }

        // 직거래 선택 시 희망 장소 체크
        if (deliveryMethods.includes('direct') && !directTradePlace.trim()) {
            alert('거래 희망 장소를 입력해 주세요.(선택)');
            return;
        }

        if (deliveryMethods.includes('parcel') && !parcelOptions.normalFee) {
            alert('택배 거래 방식을 선택하셨다면 배송비를 입력해 주세요.');
            return;
        }

        if (deliveryMethods.includes('parcel') && parcelOptions.halfOption === '가능' && !parcelOptions.halfDetailPrice) {
            alert('반값 택배를 선택하셨다면 금액을 입력해 주세요.');
            return;
        }

        // 1. FormData 객체 생성
        // const formData = new FormData();

        // 2. 이미지 파일들을 FormData에 추가
        // selectedImages.forEach((file) => {
        //     formData.append('file', file);
        // });

        const uploadImages = async (): Promise<string[]> => {
            const urls: string[] = [];
            for (const file of selectedImages) {
                const formData = new FormData();
                formData.append('file', file);

                const res = await axios.post(
                    'http://localhost:8080/api/images/upload',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                urls.push(res.data); // 업로드된 이미지 URL을 배열에 추가
            }
            return urls;
        };

        let imageUrls: string[] = [];
        try {
            imageUrls = await uploadImages();
        } catch (error) {
            const axiosError = error as any;
            console.error('이미지 업로드 실패:', axiosError.response.data);
            alert(`이미지 업로드에 실패했습니다: ${axiosError.response.data.message || '알 수 없는 오류'}`);
            return;
        }

        const tradeType = getTradeType();

        // 게시글 데이터 객체 생성
        const postData = {
            thirdCateId: thirdCateId ? parseInt(thirdCateId, 10) : null,
            exchangePostTitle: productName,
            postDescription: productDescription,
            postLocationCode: locationCode,
            postLocationName: location,
            postHopeRegion: deliveryMethods.includes('direct') ? directTradePlace : '', // 직거래 시 사용자가 입력한 값
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

            <form onSubmit={handleSubmit}>
                <S.SectionRow>
                    <S.Label>카테고리 등록</S.Label>
                    <S.CategoryGrid>
                        {/* 1차 카테고리 드롭다운 */}
                        <S.Select onChange={handleFirstCategoryChange} value={firstCateId}>
                            <option value="">1차 카테고리 선택</option>
                            {firstCategories.map(category => (
                                <option key={category.firstCateId} value={category.firstCateId}>
                                    {category.firstCateName}
                                </option>
                            ))}
                        </S.Select>

                        {/* 2차 카테고리 드롭다운 (1차 선택 시 활성화) */}
                        <S.Select onChange={handleSecondCategoryChange} value={secondCateId}>
                            <option value="">{firstCateId ? '2차 카테고리 선택' : '1차 카테고리 선택하세요.'}</option>
                            {filteredSecondCategories.map(category => (
                                <option key={category.secondCateId} value={category.secondCateId}>
                                    {category.secondCateName}
                                </option>
                            ))}
                        </S.Select>


                        {/* 3차 카테고리 드롭다운 (2차 선택 시 활성화) */}

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
                            <S.Input placeholder="거래 희망 장소를 입력해 주세요. 예) 강남역 1번 출구 앞"
                                value={directTradePlace}
                                onChange={e => setDirectTradePlace(e.target.value)}
                            />
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

                <S.SubmitButton type="submit" >등록하기</S.SubmitButton>
            </form>
        </S.Container>
    );
};

export default ExchangePost;
