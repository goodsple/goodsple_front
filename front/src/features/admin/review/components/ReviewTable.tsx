// src/features/admin/reviews/components/ReviewTable.tsx
import React from 'react';
import * as S from './ReviewTableStyle';
import type { AdminReview } from '../types/adminReview';

interface Props {
  reviews: AdminReview[];
  loading: boolean;
  onAction: (reviewId: string, newStatus: 'NORMAL'|'BLIND') => void;
  onRowClick?: (review: AdminReview) => void;
}

const ReviewTable: React.FC<Props> = ({ reviews, loading, onAction, onRowClick }) => {
  if (loading) return <div>로딩 중…</div>;
  if (!reviews.length) return <div>조회된 후기 없습니다.</div>;

  return (
    <S.Table>
      <thead>
        <tr>
          <th>후기 ID</th>
          <th>작성자</th>
          <th>대상자</th>
          <th>후기 내용</th>
          <th>신고 횟수</th>
          <th>별점</th>
          <th>후기 상태</th>
          <th>작성일</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(r => (
          <tr key={r.reviewId} onClick={() => onRowClick?.(r)}>
            <td>{r.reviewId}</td>
            <td>{r.author}</td>
            <td>{r.targetUser}</td>
            <td className="ellipsis">{r.content}</td>
            <td>{r.reportCount}</td>
            <td>{r.rating}/5</td>
            <td>{r.status==='NORMAL'?'정상':'블라인드'}</td>
            <td>{r.createdAt}</td>
            <td>
              <S.Button
                variant={r.status === 'NORMAL' ? 'blind' : 'restore'}
                onClick={e => {
                  e.stopPropagation();
                  onAction(
                    r.reviewId,
                    r.status === 'NORMAL' ? 'BLIND' : 'NORMAL'
                  );
                }}
              >
                {r.status === 'NORMAL' ? '블라인드' : '복구'}
              </S.Button>
            </td>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};

export default ReviewTable;
