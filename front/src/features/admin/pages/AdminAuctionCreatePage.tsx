import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './AdminAuctionCreatePageStyle';

const AdminAuctionCreatePage = () => {
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState({
    productName: '',
    description: '',
    startPrice: '',
    startTime: '',
    endTime: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuctionData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출된 경매 데이터:', { ...auctionData, image: imagePreview });
    alert('새로운 경매가 성공적으로 등록되었습니다! (시뮬레이션)');
    navigate('/admin/auctions');
  };

  return (
    <S.PageContainer>
      <S.Title>새 경매 등록</S.Title>
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
            <S.Input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <S.ImagePreview src={imagePreview} alt="미리보기" />}
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
            <S.ActionButton type="submit">경매 등록하기</S.ActionButton>
          </S.FormActions>
        </S.Form>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionCreatePage;