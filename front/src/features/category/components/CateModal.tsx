import * as S from '../../admin/auth/components/SearchControlsStyle.ts';

// 1. 인터페이스 정의 추가
interface CateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 2. 함수 타입 정의 수정
function CateModal({ isOpen, onClose }: CateModalProps) {
  if (!isOpen) return null;

  return (
    <S.ModalBackground>
      <S.Modal>
        <p>카테고리 등록</p>
        <S.ModalRow>
          <p>카테고리 이름</p>
          <input type={'text'} placeholder={'카테고리 이름은 최대 20자를 넘지 않도록 작성'}/>
        </S.ModalRow>
        <S.ModalRow>
          <p>상위 카테고리</p>
          <select>
            <option></option>
          </select>
          <select>
            <option></option>
          </select>
        </S.ModalRow>
        <S.ModalRow>
          <p>메인 이미지</p>
          <button>이미지 등록</button>
        </S.ModalRow>
        <S.ModalRow>
          <p>서브 이미지</p>
          <button>이미지 등록</button>
        </S.ModalRow>
        <S.ModalRow>
          <p>서브 텍스트</p>
          <input type={'text'} placeholder={'텍스트는 최대 20자를 넘지 않도록 작성'}/>
        </S.ModalRow>
        <button onClick={onClose}>닫기</button>
      </S.Modal>
    </S.ModalBackground>
  );
}

export default CateModal;