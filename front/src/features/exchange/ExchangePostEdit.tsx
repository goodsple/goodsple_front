import React, { useEffect, useState } from 'react';
import * as S from './ExchangePost.styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Category {
    firstCateId: number;
    firstCateName: string;
    secondCateId: number;
    secondCateName: string;
    thirdCateId: number;
    thirdCateName: string;
}

const ExchangePostEdit = () => {
    const { postId } = useParams<{ postId: string }>();
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    // 카테고리
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [firstCateId, setFirstCateId] = useState('');
    const [secondCateId, setSecondCateId] = useState('');
    const [thirdCateId, setThirdCateId] = useState('');
    const [filteredSecondCategories, setFilteredSecondCategories] = useState<Category[]>([]);
    const [filteredThirdCategories, setFilteredThirdCategories] = useState<Category[]>([]);

    // 상품 정보
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

    // 이미지
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // 거래 방식
    const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);
    const [parcelOptions, setParcelOptions] = useState({
        normalFee: '',
        halfDetailPrice: '',
        halfOption: '불가능',
        halfDetailOption: '둘다 가능',
    });

    // 위치
    const [location, setLocation] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [directTradePlace, setDirectTradePlace] = useState('');

    // --- 카테고리 목록 불러오기 ---
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:8080/api/post-categories');
    //             setAllCategories(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    // --- 기존 게시글 데이터 불러오기 ---
    // --- 게시글 + 카테고리 데이터 로드 (한 번만 호출) ---
    // --- 기존 게시글 데이터 불러오기 (수정) ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 전체 카테고리
                const categoriesRes = await axios.get('http://localhost:8080/api/post-categories');
                const categories: Category[] = categoriesRes.data;
                setAllCategories(categories);

                // 게시글
                const postRes = await axios.get(`http://localhost:8080/api/exchange-posts/${postId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = postRes.data;

                // 상품 정보
                setProductName(data.exchangePostTitle);
                setProductDescription(data.postDescription);
                setLocation(data.postLocationName);
                setLocationCode(data.postLocationCode);
                setDirectTradePlace(data.postHopeRegion || '');

                // 거래 방식
                if (data.postTradeType === 'BOTH') setDeliveryMethods(['direct', 'parcel']);
                else if (data.postTradeType === 'DIRECT') setDeliveryMethods(['direct']);
                else setDeliveryMethods(['parcel']);

                // 배송비
                setParcelOptions({
                    normalFee: data.deliveryPriceNormal?.toString() || '',
                    halfDetailPrice: data.deliveryPriceHalf?.toString() || '',
                    halfOption: data.deliveryPriceHalf ? '가능' : '불가능',
                    halfDetailOption: data.halfDeliveryType || '둘다 가능',
                });

                // --- 카테고리 세팅 (thirdCateId 기반) ---
                if (data.thirdCateId && categories.length) {
                    const third = categories.find(c => c.thirdCateId === data.thirdCateId);
                    if (third) {
                        setFirstCateId(third.firstCateId.toString());
                        setSecondCateId(third.secondCateId.toString());
                        setThirdCateId(third.thirdCateId.toString());

                        // 2차 필터링
                        const secondCates = categories.filter(
                            (c, i, self) =>
                                c.firstCateId === third.firstCateId &&
                                self.findIndex(v => v.secondCateId === c.secondCateId) === i
                        );
                        setFilteredSecondCategories(secondCates);

                        // 3차 필터링
                        const thirdCates = categories.filter(c => c.secondCateId === third.secondCateId);
                        setFilteredThirdCategories(thirdCates);
                    }
                }

                // 이미지
                if (data.imageUrls) setImagePreviews(data.imageUrls);

            } catch (err) {
                console.error(err);
                alert('게시글 정보를 불러오지 못했습니다.');
            }
        };
        fetchData();
    }, [postId, accessToken]);

    // --- 카테고리 변경 감지 ---
    useEffect(() => {
        if (!allCategories.length) return;

        // 2차 필터링
        if (firstCateId) {
            const secondCates = allCategories.filter(
                (c, i, self) =>
                    c.firstCateId === parseInt(firstCateId) &&
                    self.findIndex(v => v.secondCateId === c.secondCateId) === i
            );
            setFilteredSecondCategories(secondCates);
        } else setFilteredSecondCategories([]);

        // 3차 필터링
        if (secondCateId) {
            const thirdCates = allCategories.filter(c => c.secondCateId === parseInt(secondCateId));
            setFilteredThirdCategories(thirdCates);
        } else setFilteredThirdCategories([]);
    }, [allCategories, firstCateId, secondCateId]);

    // --- 카테고리 핸들러 ---
    const handleFirstCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setFirstCateId(selectedId);
        setSecondCateId('');
        setThirdCateId('');
    };
    const handleSecondCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSecondCateId(e.target.value);
        setThirdCateId('');
    };
    const handleThirdCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setThirdCateId(e.target.value);

    // --- 이미지 ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (selectedImages.length + files.length > 5) return alert('최대 5개까지 등록 가능합니다.');
        setSelectedImages(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };
    const handleRemoveImage = (index: number) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    // --- 거래 방식 ---
    const toggleDeliveryMethod = (method: string) => {
        setDeliveryMethods(prev =>
            prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
        );
    };
    const getTradeType = () => {
        if (deliveryMethods.includes('direct') && deliveryMethods.includes('parcel')) return 'BOTH';
        if (deliveryMethods.includes('direct')) return 'DIRECT';
        if (deliveryMethods.includes('parcel')) return 'DELIVERY';
        return '';
    };

    // --- 내 위치 / 주소 검색 ---
    const handleGetMyLocation = () => {
        if (!navigator.geolocation) return alert('브라우저가 위치 정보를 지원하지 않습니다.');
        navigator.geolocation.getCurrentPosition(async pos => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await axios.get('http://localhost:8080/api/location/region', { params: { latitude, longitude } });
                const region = res.data.documents[0];
                const fullAddress = `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
                setLocation(fullAddress);
                setLocationCode(region.code);
            } catch { alert('내 위치 불러오기 실패'); }
        });
    };
    const handleSearchAddress = () => {
        new (window as any).daum.Postcode({
            oncomplete: async function (data: any) {
                try {
                    const simpleAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
                    const coordRes = await axios.get("http://localhost:8080/api/location/coord", { params: { address: simpleAddress } });
                    const regionRes = await axios.get("http://localhost:8080/api/location/region", { params: coordRes.data });
                    const region = regionRes.data.documents[0];
                    const fullAddress = `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
                    setLocation(fullAddress);
                    setLocationCode(region.code);
                } catch { alert("주소 변환 실패"); }
            }
        }).open();
    };

    // --- 제출 ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (!thirdCateId) return alert('카테고리를 모두 선택해주세요.');
        if (!productName.trim()) return alert('상품명을 입력해주세요.');
        if (!productDescription.trim()) return alert('상품 설명을 입력해주세요.');
        if (!location.trim()) return alert('지역을 설정해주세요.');
        if (deliveryMethods.length === 0) return alert('거래 방식을 선택해주세요.');
        if (deliveryMethods.includes('direct') && !directTradePlace.trim()) return alert('직거래 장소를 입력해주세요.');
        if (deliveryMethods.includes('parcel') && !parcelOptions.normalFee) return alert('택배 배송비 입력해주세요.');
        if (deliveryMethods.includes('parcel') && parcelOptions.halfOption === '가능' && !parcelOptions.halfDetailPrice) return alert('반값 택배 금액 입력해주세요.');

        const tradeType = getTradeType();

        const uploadImages = async (): Promise<string[]> => {
            const urls: string[] = [];
            for (const file of selectedImages) {
                const formData = new FormData();
                formData.append('file', file);
                const res = await axios.post('http://localhost:8080/api/images/upload', formData, {
                    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' }
                });
                urls.push(res.data);
            }
            return urls;
        };

        let imageUrls: string[] = [...imagePreviews];
        if (selectedImages.length > 0) {
        try {
            const newUrls = await uploadImages();
            imageUrls = [...imagePreviews, ...newUrls]; // 기존 + 새 이미지
        } catch {
            return alert('이미지 업로드 실패');
        }
    }

    if (imageUrls.length === 0) return alert('이미지는 최소 1개 이상 필요합니다.');


        // try { imageUrls = await uploadImages(); } catch { return alert('이미지 업로드 실패'); }

        const postData = {
            thirdCateId: parseInt(thirdCateId),
            exchangePostTitle: productName,
            postDescription: productDescription,
            postLocationCode: locationCode,
            postLocationName: location,
            postHopeRegion: deliveryMethods.includes('direct') ? directTradePlace : '',
            postTradeType: tradeType,
            deliveryPriceNormal: parcelOptions.normalFee ? parseInt(parcelOptions.normalFee) : null,
            deliveryPriceHalf: (tradeType === 'DELIVERY' || tradeType === 'BOTH') && parcelOptions.halfOption === '가능'
                ? parseInt(parcelOptions.halfDetailPrice) : null,
            halfDeliveryType: (tradeType === 'DELIVERY' || tradeType === 'BOTH') && parcelOptions.halfOption === '가능'
                ? parcelOptions.halfDetailOption : null,
            imageUrls,
        };

        try {
            await axios.put(`http://localhost:8080/api/exchange-posts/${postId}`, postData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'

                }
            });
            alert('게시글 수정 완료');
            navigate(`/exchange/detail/${postId}`);
        } catch { alert('게시글 수정 실패'); }
    };

    const firstCategories = allCategories.filter(
        (c, i, self) => self.findIndex(v => v.firstCateId === c.firstCateId) === i
    );

    return (
        <S.Container>
            <S.Title>상품 수정</S.Title>
            <S.Divider />
            <form onSubmit={handleSubmit}>

                {/* 카테고리 선택 */}
                <S.SectionRow>
                    <S.Label>카테고리</S.Label>
                    <S.CategoryGrid>
                        <S.Select value={firstCateId} onChange={handleFirstCategoryChange}>
                            <option value="">1차 카테고리 선택</option>
                            {firstCategories.map(c => <option key={c.firstCateId} value={c.firstCateId}>{c.firstCateName}</option>)}
                        </S.Select>
                        <S.Select value={secondCateId} onChange={handleSecondCategoryChange}>
                            <option value="">{firstCateId ? '2차 선택' : '1차 선택'}</option>
                            {filteredSecondCategories.map(c => <option key={c.secondCateId} value={c.secondCateId}>{c.secondCateName}</option>)}
                        </S.Select>
                        <S.Select value={thirdCateId} onChange={handleThirdCategoryChange}>
                            <option value="">{secondCateId ? '3차 선택' : '2차 선택'}</option>
                            {filteredThirdCategories.map(c => <option key={c.thirdCateId} value={c.thirdCateId}>{c.thirdCateName}</option>)}
                        </S.Select>
                    </S.CategoryGrid>
                </S.SectionRow>

                {/* 상품명 */}
                <S.SectionRow>
                    <S.Label>상품명</S.Label>
                    <S.InputWrapper>
                        <S.Input value={productName} onChange={e => setProductName(e.target.value)} maxLength={40} />
                        <S.CharCount>{productName.length}/40</S.CharCount>
                    </S.InputWrapper>
                </S.SectionRow>

                {/* 상품 설명 */}
                <S.SectionRow>
                    <S.Label>상품 설명</S.Label>
                    <S.TextAreaWrapper>
                        <S.TextArea value={productDescription} onChange={e => setProductDescription(e.target.value)} maxLength={2000} />
                        <S.CharCount>{productDescription.length}/2000</S.CharCount>
                    </S.TextAreaWrapper>
                </S.SectionRow>

                {/* 이미지 */}
                <S.SectionRow>
                    <S.Label>이미지 등록</S.Label>
                    <S.ImagePreviewWrapper>
                        {imagePreviews.map((url, i) => (
                            <S.ImageBox key={i}>
                                <img src={url} alt={`preview-${i}`} />
                                <S.DeleteButton type="button" onClick={() => handleRemoveImage(i)}>×</S.DeleteButton>
                            </S.ImageBox>
                        ))}
                        <S.Input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    </S.ImagePreviewWrapper>
                </S.SectionRow>

                {/* 위치 */}
                <S.LocationSectionRow>
                    <S.Label>내 위치</S.Label>
                    <S.ButtonRow>
                        <S.Button type='button' onClick={handleGetMyLocation}>내 위치</S.Button>
                        <S.Button type='button' onClick={handleSearchAddress}>주소 검색</S.Button>
                    </S.ButtonRow>
                </S.LocationSectionRow>
                <S.LocationInputWrapper>
                    <S.AutoFilledInput value={location} readOnly placeholder="지역을 설정해 주세요." />
                </S.LocationInputWrapper>

                {/* 거래 방식 */}
                <S.SectionRow>
                    <S.Label>거래 방식</S.Label>
                    <S.ButtonRow>
                        <S.ToggleButton selected={deliveryMethods.includes('direct')} onClick={() => toggleDeliveryMethod('direct')}>직거래</S.ToggleButton>
                        <S.ToggleButton selected={deliveryMethods.includes('parcel')} onClick={() => toggleDeliveryMethod('parcel')}>택배거래</S.ToggleButton>
                    </S.ButtonRow>
                </S.SectionRow>

                {/* 직거래 */}
                {deliveryMethods.includes('direct') && (
                    <S.DirectTradeInputWrapper>
                        <S.SubLabel>직거래</S.SubLabel>
                        <S.Divider />
                        <S.SectionRow>
                            <S.Label>거래 희망 장소</S.Label>
                            <S.Input value={directTradePlace} onChange={e => setDirectTradePlace(e.target.value)} placeholder="예) 강남역 1번 출구 앞" />
                        </S.SectionRow>
                    </S.DirectTradeInputWrapper>
                )}

                {/* 택배거래 */}
                {deliveryMethods.includes('parcel') && (
                    <S.ParcelTradeWrapper>
                        <S.SubLabel>택배거래</S.SubLabel>
                        <S.Divider />
                        <S.SectionRow>
                            <S.Label>배송비 설정</S.Label>
                            <S.Box>
                                <S.ParcelRow>
                                    <span>일반택배(필수)</span>
                                    <S.AmountInput type="number" value={parcelOptions.normalFee} onChange={e => setParcelOptions(prev => ({ ...prev, normalFee: e.target.value }))} />
                                    <span>원</span>
                                </S.ParcelRow>

                                <S.ParcelRow>
                                    <span>GS반값・CU알뜰택배(선택)</span>
                                    <S.RadioGroup>
                                        <label>
                                            <input type="radio" name="halfOption" value="가능" checked={parcelOptions.halfOption === '가능'} onChange={e => setParcelOptions(prev => ({ ...prev, halfOption: e.target.value }))} />
                                            가능
                                        </label>
                                        <label>
                                            <input type="radio" name="halfOption" value="불가능" checked={parcelOptions.halfOption === '불가능'} onChange={e => setParcelOptions(prev => ({ ...prev, halfOption: e.target.value }))} />
                                            불가능
                                        </label>
                                    </S.RadioGroup>
                                </S.ParcelRow>

                                {parcelOptions.halfOption === '가능' && (
                                    <S.ConditionalOptions>
                                        <S.Select value={parcelOptions.halfDetailOption} onChange={e => setParcelOptions(prev => ({ ...prev, halfDetailOption: e.target.value }))}>
                                            <option value="둘다 가능">둘다 가능</option>
                                            <option value="GS25">GS25만 가능</option>
                                            <option value="CU">CU만 가능</option>
                                        </S.Select>
                                        <S.AmountInputWrapper>
                                            <S.AmountInput type="number" value={parcelOptions.halfDetailPrice} onChange={e => setParcelOptions(prev => ({ ...prev, halfDetailPrice: e.target.value }))} />
                                            <span>원</span>
                                        </S.AmountInputWrapper>
                                    </S.ConditionalOptions>
                                )}
                            </S.Box>
                        </S.SectionRow>
                    </S.ParcelTradeWrapper>
                )}

                <S.SubmitButton type="submit">수정하기</S.SubmitButton>
            </form>
        </S.Container>
    );
};

export default ExchangePostEdit;
