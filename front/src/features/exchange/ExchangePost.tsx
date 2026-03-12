import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangePost.styles';
import axiosInstance from '../../api/axiosInstance';


// ===== 교환게시글 작성 컴포넌트 =====

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
    const navigate = useNavigate();

    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    // ↑↑↑↑↑↑ 이 코드는 '내 위치'나 '주소 검색'으로 얻은 좌표를 저장하는 역할을 합니다.

    // 유효성 검사 메시지 상태
    const [errors, setErrors] = useState({
        productName: '',
        productDescription: '',
        images: '',
        deliveryMethods: '',
        location: '',
        directTradePlace: '',
        normalFee: '',
        halfDetailPrice: '',
        category: '',
    });


    // 카테고리 불러오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // 이 API 경로는 백엔드에서 카테고리 목록을 제공하는 엔드포인트로 변경해야 합니다.
                // 예를 들어, GET /api/categories 또는 GET /api/categories/list
                const response = await axiosInstance.get('/post-categories');
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

                setCoordinates({ lat: latitude, lng: longitude });
                // ↑↑↑↑↑↑ 이 코드가 현재 위치의 좌표를 state에 저장합니다.

                try {
                    const res = await axiosInstance.get('/location/region', {
                        params: { latitude, longitude }
                    });

                    if (res.data.documents && res.data.documents.length > 0) {
                        const region = res.data.documents.find((item: any) => item.regionType === 'H') || res.data.documents[0];
                        // 시/구/동만 합치기
                        const fullAddress = `${region.region_1depthName} ${region.region_2depthName} ${region.region_3depthName}`;
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
                    const coordRes = await axiosInstance.get("/location/coord", {
                        params: { address: simpleAddress },
                    });
                    const { latitude, longitude } = coordRes.data;

                    setCoordinates({ lat: latitude, lng: longitude });
                    // ↑↑↑↑↑↑ 이 코드가 검색한 주소의 좌표를 state에 저장합니다.

                    // 3. 좌표 → 행정동 코드 조회
                    const regionRes = await axiosInstance.get("/location/region", {
                        params: { latitude, longitude },
                    });

                    if (regionRes.data.documents && regionRes.data.documents.length > 0) {
                        const region = regionRes.data.documents.find((item: any) => item.regionType === 'H') || regionRes.data.documents[0];
                        const fullAddress = `${region.region_1depthName} ${region.region_2depthName} ${region.region_3depthName}`;

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

        // 초기화
        setErrors({
            productName: '',
            productDescription: '',
            images: '',
            deliveryMethods: '',
            location: '',
            directTradePlace: '',
            normalFee: '',
            halfDetailPrice: '',
            category: '',
        });

        let valid = true;

        // 3차 카테고리
        if (!thirdCateId) {
            setErrors(prev => ({ ...prev, category: '❗카테고리를 모두 선택해 주세요.' }));
            valid = false;
        }

        if (!productName.trim()) {
            setErrors(prev => ({ ...prev, productName: '❗상품명을 입력해 주세요.' }));
            valid = false;
        }

        if (!productDescription.trim() || productDescription.length < 15) {
            setErrors(prev => ({ ...prev, productDescription: '❗상품 설명을 15글자 이상 입력해 주세요.' }));
            valid = false;
        }

        if (selectedImages.length === 0) {
            setErrors(prev => ({ ...prev, images: '❗상품 사진을 등록 해주세요.' }));
            valid = false;
        }

        if (!location.trim()) {
            setErrors(prev => ({ ...prev, location: '❗지역을 설정해 주세요.' }));
            valid = false;
        }

        if (deliveryMethods.length === 0) {
            setErrors(prev => ({ ...prev, deliveryMethods: '❗거래방식을 선택해 주세요.' }));
            valid = false;
        }

        if (deliveryMethods.includes('direct') && !directTradePlace.trim()) {
            setErrors(prev => ({ ...prev, directTradePlace: '❗거래희망장소를 입력해 주세요.' }));
            valid = false;
        }

        if (deliveryMethods.includes('parcel')) {
            const normalFee = parseInt(parcelOptions.normalFee || '0', 10);
            if (!parcelOptions.normalFee) {
                setErrors(prev => ({ ...prev, normalFee: '❗일반택배 배송비를 입력해 주세요.' }));
                valid = false;
            } else if (normalFee < 1000) {
                setErrors(prev => ({ ...prev, normalFee: '❗1,000원 이상 입력해 주세요.' }));
                valid = false;
            } else if (normalFee > 25000) {
                setErrors(prev => ({ ...prev, normalFee: '❗1,000원 ~ 25,000원 까지 입력 가능합니다.' }));
                valid = false;
            }

            if (parcelOptions.halfOption === '가능') {
                const halfPrice = parseInt(parcelOptions.halfDetailPrice || '0', 10);
                if (!parcelOptions.halfDetailPrice) {
                    setErrors(prev => ({ ...prev, halfDetailPrice: '❗배송비를 입력해 주세요.' }));
                    valid = false;
                } else if (halfPrice < 1000) {
                    setErrors(prev => ({ ...prev, halfDetailPrice: '❗1,000원 이상 입력해 주세요.' }));
                    valid = false;
                } else if (halfPrice > 25000) {
                    setErrors(prev => ({ ...prev, halfDetailPrice: '❗1,000원 ~ 25,000원 까지 입력 가능합니다.' }));
                    valid = false;
                }
            }
        }

        if (!valid) return; // 유효성 통과 못하면 전송 중단

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

            // ↓↓↓↓↓↓ 여기에 아래 두 줄을 추가하세요 ↓↓↓↓↓↓
            latitude: coordinates.lat,
            longitude: coordinates.lng,
        };


        try {
            const response = await axiosInstance.post(
                '/exchange-posts',
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 사용자 인증 토큰을 여기에 넣으세요.
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('게시글 등록이 완료되었습니다.');
            // console.log('등록 성공:', response.data);

            console.log('response.data:', response.data)

            // const locationHeader = response.headers['location']; // "/api/exchange-posts/123"
            const newPostId = response.data.postId;
            navigate(`/exchange/detail/${newPostId}`);

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

                    <S.FormField>
                        <S.CategoryGrid>
                            {/* 1차 카테고리 선택 */}
                            <S.Select onChange={handleFirstCategoryChange}
                            value={firstCateId}
                            size={5}
                            >
                                <option value="">1차 카테고리 선택</option>
                                {firstCategories.map(category => (
                                    <option key={category.firstCateId} value={category.firstCateId}>
                                        {category.firstCateName}
                                    </option>
                                ))}
                            </S.Select>

                            {/* 2차 카테고리 선택 (1차 선택 시 활성화) */}
                            <S.Select onChange={handleSecondCategoryChange}
                            value={secondCateId}
                            size={5}
                            >
                                <option value="">{firstCateId ? '2차 카테고리 선택' : '1차 카테고리 선택하세요.'}</option>
                                {filteredSecondCategories.map(category => (
                                    <option key={category.secondCateId} value={category.secondCateId}>
                                        {category.secondCateName}
                                    </option>
                                ))}
                            </S.Select>


                            {/* 3차 카테고리 선택 (2차 선택 시 활성화) */}
                            <S.Select onChange={handleThirdCategoryChange}
                            value={thirdCateId}
                            size={5}
                            >
                                <option value="">
                                    {!firstCateId
                                        ? '1차 카테고리 선택하세요.'
                                        : !secondCateId
                                            ? '2차 카테고리 선택하세요.'
                                            : '3차 카테고리 선택'
                                    }
                                </option>
                                {filteredThirdCategories.map(category => (
                                    <option key={category.thirdCateId} value={category.thirdCateId}>
                                        {category.thirdCateName}
                                    </option>
                                ))}
                            </S.Select>
                        </S.CategoryGrid>
                        {errors.category && <S.ErrorMessage>{errors.category}</S.ErrorMessage>}
                    </S.FormField>
                </S.SectionRow>

                <S.SectionRow>
                    <S.Label>상품명</S.Label>

                    <S.FormField>
                        <S.InputWrapper>
                            <S.Input
                                placeholder="상품명을 입력해 주세요."
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                maxLength={40}
                            />
                            <S.CharCount>{productName.length}/40</S.CharCount>
                        </S.InputWrapper>
                        {errors.productName && <S.ErrorMessage>{errors.productName}</S.ErrorMessage>}
                    </S.FormField>
                </S.SectionRow>

                <S.SectionRow>
                    <S.Label>상품 설명</S.Label>

                    <S.FormField>
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
                        {errors.productDescription && <S.ErrorMessage>{errors.productDescription}</S.ErrorMessage>}
                    </S.FormField>
                </S.SectionRow>

                <S.SectionRow>
                    <S.Label>이미지 등록 (필수)</S.Label>

                    <S.FormField>
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

                        {selectedImages.length < 5 && (
                            <S.UploadLabel htmlFor="image-upload">
                                +
                                <span>이미지 추가</span>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </S.UploadLabel>
                        )}
                    </S.ImagePreviewWrapper>
                    {errors.images && <S.ErrorMessage>{errors.images}</S.ErrorMessage>}
                    </S.FormField>
                </S.SectionRow>

                <S.SectionRow>
                    <S.Label>내 위치</S.Label>

                    <S.FormField>
                        <S.ButtonRow>
                            <S.Button type='button' onClick={handleGetMyLocation}>
                                내 위치
                            </S.Button>
                            <S.Button type="button" onClick={handleSearchAddress}>
                                주소 검색
                            </S.Button>
                        </S.ButtonRow>

                        <S.AutoFilledInput
                            placeholder="지역을 설정해 주세요."
                            value={location}
                            readOnly />
                        {errors.location && <S.ErrorMessage>{errors.location}</S.ErrorMessage>}
                    </S.FormField>
                </S.SectionRow>


                <S.SectionRow>
                    <S.Label>거래 방식</S.Label>

                    <S.FormField>
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
                        {errors.deliveryMethods && <S.ErrorMessage>{errors.deliveryMethods}</S.ErrorMessage>}
                    </S.FormField>
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

                                    <S.FormField>
                                        <S.AmountInputWrapper>
                                            <S.AmountInput
                                                type="number"
                                                placeholder="금액 입력"
                                                value={parcelOptions.normalFee}
                                                onChange={e =>
                                                    setParcelOptions(prev => ({ ...prev, normalFee: e.target.value }))
                                                }
                                            />
                                            <span>원</span>
                                        </S.AmountInputWrapper>
                                        {errors.normalFee && <S.ErrorMessage>{errors.normalFee}</S.ErrorMessage>}
                                    </S.FormField>
                                </S.ParcelRow>

                                <S.FormField>
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
                                </S.FormField>


                                {parcelOptions.halfOption === '가능' && (
                                    <S.ConditionalOptions>
                                        <S.FormField>
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
                                        </S.FormField>

                                        <S.FormField>
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
                                            {errors.halfDetailPrice && <S.ErrorMessage>{errors.halfDetailPrice}</S.ErrorMessage>}
                                        </S.FormField>
                                    </S.ConditionalOptions>
                                )}
                            </S.Box>
                        </S.SectionRow>
                    </S.ParcelTradeWrapper>
                )}

                <S.SubmitButton type="submit" >등록하기</S.SubmitButton>
            </form>
        </S.Container >
    );
};

export default ExchangePost;
