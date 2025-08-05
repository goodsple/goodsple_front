// src/features/admin/reviews/pages/AdminReviewPage.tsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import * as S from './AdminReviewPageStyle';
import SearchControls from '../components/SearchControls';
import ReviewTable from '../components/ReviewTable';
import Pagination from '../../../../components/common/pagination/Pagination';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';
import { mockReviews } from '../mock/mockReviews';
import type { AdminReview, SearchCriteria } from '../types/adminReview';
import ReviewDetailModal from '../modal/ReviewDetailModal';

const AdminReviewPage: React.FC = () => {
    // 기존 state
    const [reviews, setReviews]       = useState<AdminReview[]>([]);
    const [loading, setLoading]       = useState(false);
    const [currentPage, setCurrentPage]= useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [criteria, setCriteria]     = useState<SearchCriteria>({
        keyword:'', statuses:[], fromDate:'', toDate:''
    });

    // 삭제/블라인드 처리용 모달 상태
    const [confirmOpen, setConfirmOpen]   = useState(false);
    const [pendingId, setPendingId]       = useState<string|null>(null);
    const [pendingStatus, setPendingStatus]=useState<'NORMAL'|'BLIND'>('NORMAL');
    const [resultOpen, setResultOpen]     = useState(false);
    const [resultMsg, setResultMsg]       = useState('');

    // 리뷰 상세 모달 상태
    const [detailOpen, setDetailOpen]       = useState(false);
    const [selectedReview, setSelectedReview] = useState<AdminReview|null>(null);

    useEffect(()=>{
        // Mock 테스트
        setReviews(mockReviews);
        setTotalPages(3);
    },[]);

    const handleSearch = (c: SearchCriteria) => {
        setCriteria(c);
        setCurrentPage(1);
    };

    // 리뷰 행 클릭 시
    const handleRowClick = (review: AdminReview) => {
        setSelectedReview(review);
        setDetailOpen(true);
    };

    // 모달에서 저장
    const handleSaveDetail = async ({ reviewId, status }: { reviewId:string; status:AdminReview['status'] }) => {
        // await axiosInstance.put(`/admin/reviews/${reviewId}`, { status });
        setDetailOpen(false);
        // 결과 표시
        setResultMsg(status === 'BLIND' ? '블라인드 처리되었습니다.' : '정상 처리되었습니다.');
        setResultOpen(true);
        // TODO: 목록 갱신
    };

    // 기존 onAction (블라인드/복구) 콜백
    const handleAction = (id:string, newStatus:'NORMAL'|'BLIND') => {
        setPendingId(id);
        setPendingStatus(newStatus);
        setConfirmOpen(true);
    };
    const doAction = async () => {
        // await axiosInstance.put(`/admin/reviews/${pendingId}`, { status: pendingStatus });
        setConfirmOpen(false);
        setResultMsg(pendingStatus === 'BLIND' ? '블라인드 처리되었습니다.' : '정상 처리되었습니다.');
        setResultOpen(true);
        // TODO: 목록 갱신
    };

  return (
    <S.Container>
      <SearchControls onSearch={handleSearch} />

      <S.TableWrap>
        <ReviewTable
          reviews={reviews}
          loading={loading}
          onAction={handleAction}
          onRowClick={handleRowClick}
        />
      </S.TableWrap>

      <S.PaginationWrap>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrap>

      <ConfirmModal
        isOpen={confirmOpen}
        content={
            pendingStatus === 'BLIND' ? (
              <>
                <p>해당 후기를 블라인드 처리하시겠습니까?</p>
                <p>
                  블라인드 처리 시 사용자에게 보이지 않으며,<br />
                  상태는 <strong>블라인드</strong>로 변경됩니다.
                </p>
              </>
            ) : (
              <>
                <p>해당 후기를 복구하시겠습니까?</p>
                <p>
                  복구 시 상태가 <strong>정상</strong>으로 변경되며,<br />
                  다시 사용자에게 노출됩니다.
                </p>
              </>
            )
        }
        showCancel
        confirmText="확인"
        cancelText="취소"
        onConfirm={doAction}
        onCancel={()=>setConfirmOpen(false)}
      />

      <ConfirmModal
        isOpen={resultOpen}
        content={resultMsg}
        showCancel={false}
        confirmText="확인"
        onConfirm={()=>setResultOpen(false)}
      />
       <ReviewDetailModal
        isOpen={detailOpen}
        review={selectedReview}
        onClose={() => setDetailOpen(false)}
        onSave={handleSaveDetail}
      />
    </S.Container>
  );
};

export default AdminReviewPage;
