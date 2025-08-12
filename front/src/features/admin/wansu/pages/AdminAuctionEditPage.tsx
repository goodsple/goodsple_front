import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './AdminAuctionCreatePageStyle'; // ✨ 등록 페이지 스타일 재사용

// 수정을 위해 불러왔다고 가정한 목업 데이터
const mockAuctionToEdit = {
  id: 4,
  productName: '세븐틴 FML 개봉앨범',
  description: '포토카드 확인만 하고 보관한 거의 새 상품입니다. 구성품 모두 포함.',
  startPrice: '5000',
  startTime: '2025-06-30T20:00',
  endTime: '2025-06-30T21:00',
  imageUrl: 'https://picsum.photos/seed/svt_edit/200/200',
};

const AdminAuctionEditPage = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams(); // URL에서 경매 ID를 가져옴
  const [auctionData, setAuctionData] = useState({
    productName: '',
    description: '',
    startPrice: '',
    startTime: '',
    endTime: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 실제로는 auctionId를 이용해 서버에서 데이터를 불러오는 로직
    console.log(`ID: ${auctionId} 경매 데이터 불러오기`);
    // 지금은 목업 데이터를 초기값으로 설정
    setAuctionData({
      productName: mockAuctionToEdit.productName,
      description: mockAuctionToEdit.description,
      startPrice: mockAuctionToEdit.startPrice,
      startTime: mockAuctionToEdit.startTime,
      endTime: mockAuctionToEdit.endTime,
    });
    setImagePreview(mockAuctionToEdit.imageUrl);
  }, [auctionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuctionData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`수정된 경매 데이터 (ID: ${auctionId}):`, { ...auctionData, image: imagePreview });
    alert(`경매(ID: ${auctionId}) 정보가 성공적으로 수정되었습니다!`);
    navigate('/admin/auctions');
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
            <S.ActionButton type="submit">수정 완료</S.ActionButton>
          </S.FormActions>
        </S.Form>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionEditPage;