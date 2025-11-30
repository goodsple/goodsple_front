import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdminAuctionDetail, updateAdminAuction, uploadImage } from '../api/auctionApi';
import * as S from './AdminAuctionCreatePageStyle';

const formatDateTimeForInput = (isoString: string) => {
  if (!isoString) return '';
  return isoString.slice(0, 16);
};

const AdminAuctionEditPage = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams(); 
  const [auctionData, setAuctionData] = useState({
    productName: '',
    description: '',
    startPrice: '',
    minBidUnit: '',
    startTime: '',
    endTime: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAuctionDetail = async () => {
      if (!auctionId) return;
      try {
        const data = await getAdminAuctionDetail(Number(auctionId));
        setAuctionData({
          productName: data.productName,
          description: data.description,
          startPrice: String(data.startPrice),
          minBidUnit: String(data.minBidUnit),
          startTime: formatDateTimeForInput(data.startTime),
          endTime: formatDateTimeForInput(data.endTime),
        });
        if (data.imageUrls && data.imageUrls.length > 0) {
          setImagePreview(data.imageUrls[0]);
        }
      } catch (error) {
        console.error('경매 정보를 불러오는 데 실패했습니다:', error);
        alert('경매 정보를 불러올 수 없습니다.');
        navigate('/admin/auctions');
      }
    };
    fetchAuctionDetail();
  }, [auctionId, navigate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuctionData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result as string); };
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
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auctionId) return;
    setIsSubmitting(true);

    try {
      let imageUrl = imagePreview; 
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      if (!imageUrl) {
        alert('상품 이미지를 등록해주세요.');
        setIsSubmitting(false);
        return;
      }

      await updateAdminAuction(Number(auctionId), {
        productName: auctionData.productName,
        description: auctionData.description,
        startPrice: Number(auctionData.startPrice),
        minBidUnit: Number(auctionData.minBidUnit),
        startTime: new Date(auctionData.startTime).toISOString(),
        endTime: new Date(auctionData.endTime).toISOString(),
        imageUrls: [imageUrl],
      });

      alert(`경매(ID: ${auctionId}) 정보가 성공적으로 수정되었습니다!`);
      navigate('/admin/auctions');

    } catch (error) {
      console.error('경매 수정에 실패했습니다:', error);
      alert('경매 수정에 실패했습니다. 입력 값을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <S.PageContainer>
      <S.ContentCard>
        <S.Form onSubmit={handleSubmit}>
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
            <S.ActionButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '수정 중...' : '수정 완료'}
            </S.ActionButton>
          </S.FormActions>
        </S.Form>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionEditPage;