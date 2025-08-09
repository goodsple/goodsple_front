import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
import { useDispatch, useSelector } from 'react-redux';

interface CateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CateModal({ isOpen, onClose }: CateModalProps) {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const secondCates = useSelector(state => state.category.secondCate);

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
          <select name={"first"}>
            <option value={1}>K-pop</option>
            <option value={2}>영화/드라마</option>
            <option value={3}>애니메이션</option>
            <option value={4}>게임</option>
          </select>
          <select>
            <option>등록</option>
          </select>
          <select>
            <option>등록</option>
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
        <S.ModalRow2>
          <button onClick={onClose}>저장하기</button>
          <button onClick={onClose}>취소</button>
        </S.ModalRow2>
      </S.Modal>
    </S.ModalBackground>
  );
}

export default CateModal;