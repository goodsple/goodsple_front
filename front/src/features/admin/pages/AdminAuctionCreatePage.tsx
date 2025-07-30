import { useRef, useState } from 'react'; // ✨ useRef 추가
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
  const fileInputRef = useRef<HTMLInputElement>(null); // ✨ 파일 input 참조를 위한 ref

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

  // ✨ 이미지 취소 핸들러 추가
  const handleCancelImage = () => {
    setImagePreview(null);
    // 파일 input의 값을 초기화하여 같은 파일을 다시 선택할 수 있도록 함
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      {/* ✨ Title 컴포넌트 삭제 */}
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
            
            {/* ✨ 이미지 미리보기와 취소 버튼 UI 변경 */}
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
            <S.ActionButton type="submit">경매 등록</S.ActionButton>
          </S.FormActions>
        </S.Form>
      </S.ContentCard>
    </S.PageContainer>
  );
};

export default AdminAuctionCreatePage;