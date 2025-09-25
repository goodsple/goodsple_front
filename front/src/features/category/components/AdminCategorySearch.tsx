import * as S from '../../admin/auth/components/SearchControlsStyle.ts';
import search from '../../../assets/images/search.png';
import { useState } from 'react';
import CateModal from './CateModal.tsx';


function AdminCategorySearch() {
  const [isCateModalOpen, setIsCateModalOpen] = useState(false);
  // const [isFourthModalOpen, setIsFourthModalOpen] = useState(false);

  const openCateModal = () => setIsCateModalOpen(true);
  const closeCateModal = () => setIsCateModalOpen(false);
  // const openFourthModal = () => setIsFourthModalOpen(true);
  // const closeFourthModal = () => setIsFourthModalOpen(false);

  return (
    <>
      <S.Form>
        <S.SearchWrap>
          <input type={'text'} placeholder={'검색'} />
          <button>
            <img src={search} />
          </button>
        </S.SearchWrap>
        <S.ButtonWrap>

          {/* 4차 카테고리 기능 삭제 */}
          {/* <button type="button">
            4차 카테고리
          </button> */}

          <button type="button" onClick={openCateModal}>
            ╋ 카테고리 등록
          </button>
        </S.ButtonWrap>
      </S.Form>

      {isCateModalOpen && (
        <CateModal isOpen={isCateModalOpen} onClose={closeCateModal}/>
      )}
</>
  );
}

export default AdminCategorySearch;