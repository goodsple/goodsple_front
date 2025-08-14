// admin/pages/AdminAuctionCreatePage.tsx (수정본)

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// API 함수들을 import 합니다.
import { createAdminAuction, uploadImage } from '../api/auctionApi';
import * as S from './AdminAuctionCreatePageStyle';

const AdminAuctionCreatePage = () => {
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState({
    productName: '',
    description: '',
    startPrice: '',
    minBidUnit: '1000', // 최소 입찰 단위 기본값 설정
    startTime: '',
    endTime: '',
  });
  
  // 상태 변수들을 추가/수정합니다.
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 자체를 저장
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 전송 중 상태
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuctionData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // 파일 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // handleSubmit 함수를 API 호출 로직으로 교체합니다.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('상품 이미지를 등록해주세요.');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. 이미지 업로드 API 호출 (현재는 임시 목업 함수)
      const imageUrl = await uploadImage(imageFile);

      // 2. 경매 생성 API 호출
      await createAdminAuction({
        productName: auctionData.productName,
        description: auctionData.description,
        startPrice: Number(auctionData.startPrice),
        minBidUnit: Number(auctionData.minBidUnit),
        startTime: new Date(auctionData.startTime).toISOString(), // ISO 형식으로 변환
        endTime: new Date(auctionData.endTime).toISOString(),
        imageUrls: [imageUrl], // 업로드된 이미지 URL 사용
      });

      alert('새로운 경매가 성공적으로 등록되었습니다!');
      navigate('/admin/auctions'); // 성공 시 목록 페이지로 이동

    } catch (error) {
      console.error('경매 등록에 실패했습니다:', error);
      // 백엔드에서 보낸 에러 메시지를 보여주는 것이 더 좋습니다.
      alert('경매 등록에 실패했습니다. 입력 값을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.PageContainer>
      <S.ContentCard>
        <S.Form onSubmit={handleSubmit}>
          {/* 폼의 다른 부분들은 기존과 동일합니다. */}
          <S.FormGroup>
            <S.Label htmlFor="productName">상품명</S.Label>
            <S.Input type="text" id="productName" name="productName" value={auctionData.productName} onChange={handleChange} required />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="description">상품 설명</S.Label>
            <S.Textarea id="description" name="description" value={auctionData.description} onChange={handleChange} rows={5} required></S.Textarea>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="image">상품 이미지</S.Label>
            <S.Input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
            {imagePreview && (
              <S.ImagePreviewWrapper>
                <S.ImagePreview src={imagePreview} alt="미리보기" />
                <S.ImageCancelButton type="button" onClick={handleCancelImage}>X</S.ImageCancelButton>
              </S.ImagePreviewWrapper>
            )}
          </S.FormGroup>
          
          <S.FormGrid>
            <S.FormGroup>
              <S.Label htmlFor="startPrice">시작가 (원)</S.Label>
              <S.Input type="number" id="startPrice" name="startPrice" value={auctionData.startPrice} onChange={handleChange} required />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="minBidUnit">최소 입찰 단위 (원)</S.Label>
              <S.Input type="number" id="minBidUnit" name="minBidUnit" value={auctionData.minBidUnit} onChange={handleChange} required />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="startTime">경매 시작 시간</S.Label>
              <S.Input type="datetime-local" id="startTime" name="startTime" value={auctionData.startTime} onChange={handleChange} required />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="endTime">경매 종료 시간</S.Label>
              <S.Input type="datetime-local" id="endTime" name="endTime" value={auctionData.endTime} onChange={handleChange} required />
            </S.FormGroup>
          </S.FormGrid>
          
          <S.FormActions>
            <S.ActionLink to="/admin/auctions">취소</S.ActionLink>
            {/* 전송 중일 때 버튼 비활성화 */}
            <S.ActionButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '경매 등록'}
            </S.ActionButton>
          </S.FormActions>
        </S.Form>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionCreatePage;