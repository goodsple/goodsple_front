import React, { useState, useEffect, useRef } from 'react';
import * as S from './ReviewDetailModalStyle';
import type { AdminReview } from '../types/adminReview';
import cancelImg from '../../../../assets/images/cancel.png';
import starFull  from '../../../../assets/images/star_full.png';
import arrowLeft from '../../../../assets/images/arrow_left.png';
import arrowRight from '../../../../assets/images/arrow_right.png';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';

type Props = {
  isOpen: boolean;
  review: AdminReview | null;
  onClose: () => void;
  onSave: (updated: { reviewId: string; status: AdminReview['status'] }) => void;
};

const ReviewDetailModal: React.FC<Props> = ({ isOpen, review, onClose, onSave }) => {
  const [status, setStatus] = useState<AdminReview['status']>('NORMAL');
  const [showConfirm, setShowConfirm] = useState(false);

  const [showResult, setShowResult]     = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  
  const [photoIndex, setPhotoIndex]   = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDownRef   = useRef(false);
  const startXRef   = useRef(0);
  const scrollRef   = useRef(0);

  // ── 1) 리뷰가 바뀔 때마다 초기화 ──
  useEffect(() => {
    if (!review || !containerRef.current) return;
    setStatus(review.status);
    setPhotoIndex(0);
    containerRef.current.scrollLeft = 0;
  }, [review]);

  // 스크롤 인덱스
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setPhotoIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

    if (!isOpen || !review) return null;

    const handleClickSave = () => setShowConfirm(true);

    const handleConfirmSave = () => {
        setShowConfirm(false);
        onSave({ reviewId: review.reviewId, status });

        // 저장 결과 모달
        setResultMessage('변경 사항이 저장되었습니다.');
        setShowResult(true);
    };

    const handleCancelSave = () => setShowConfirm(false);

    const handleResultClose = () => {
        setShowResult(false);
        onClose();  
    };

    // 사진이 여러 장일 때 넘기는 예시 (optional)
    const prevPhoto = () => setPhotoIndex(i => Math.max(0, i - 1));
    const nextPhoto = () => setPhotoIndex(i => Math.min(review.photos!.length - 1, i + 1));

  return (
      <S.Overlay>
        <S.Dialog>
          <S.Header>
            <h3>후기 상세보기</h3>
            <S.CloseButton src={cancelImg} alt="닫기" onClick={onClose} />
          </S.Header>

          <S.Body>
            <S.Field>
              <S.Label>후기 ID</S.Label>
              <S.Value>{review.reviewId}</S.Value>
            </S.Field>
            <S.Field>
              <S.Label>작성자</S.Label>
              <S.Value>{review.author}</S.Value>
            </S.Field>
            <S.Field>
              <S.Label>대상자</S.Label>
              <S.Value>{review.targetUser}</S.Value>
            </S.Field>
            <S.Field>
              <S.Label>작성일</S.Label>
              <S.Value>{review.createdAt}</S.Value>
            </S.Field>
            <S.Field>
              <S.Label>신고 횟수</S.Label>
              <S.Value>{review.reportCount}</S.Value>
            </S.Field>
            <S.Field>
              <S.Label>상태</S.Label>
              <S.Select value={status} onChange={e => setStatus(e.target.value as any)}>
                <option value="NORMAL">정상</option>
                <option value="BLIND">블라인드</option>
              </S.Select>
            </S.Field>
            <S.Separator />
            
            <S.FieldFull row>
              <S.Label>게시글 제목</S.Label>
              <S.Value className='postTitle'>{review.title}</S.Value>
            </S.FieldFull>
            <S.Separator />

            <S.FieldFull row>
              <S.Label>후기 내용</S.Label>
              <S.ReviewContentWrapper>
                <S.PhotoSliderWrapper>
                    {/* 스크롤 가능한 영역 */}
                    <S.LargePhotoContainer ref={containerRef}>
                        {review.photos!.map((url,idx)=>(
                            <S.LargePhoto 
                                key={idx} 
                                src={url} 
                                alt={`후기 사진 ${idx + 1}`} 
                            />
                        ))}
                    </S.LargePhotoContainer>

                    {/* 스크롤 외부에 고정될 화살표/인디케이터 */}
                    {photoIndex > 0 && (
                        <S.NavArrowLeft
                            src={arrowLeft}
                            alt="이전 사진" 
                            onClick={() => {
                                const el = containerRef.current!;
                                const newIndex = photoIndex - 1;
                                el.scrollLeft = newIndex * el.clientWidth;
                                setPhotoIndex(newIndex);
                            }}
                        />
                    )}
                    {photoIndex < review.photos!.length - 1 && (
                        <S.NavArrowRight
                            src={arrowRight}
                            alt="다음 사진"
                            onClick={() => {
                                const el = containerRef.current!;
                                const newIndex = photoIndex + 1;
                                el.scrollLeft = newIndex * el.clientWidth;
                                setPhotoIndex(newIndex);
                            }}
                        />
                    )}
                    <S.PageIndicatorOverlay>
                        {photoIndex + 1}/{review.photos!.length}
                    </S.PageIndicatorOverlay>
                </S.PhotoSliderWrapper>

                <S.Content>{review.content}</S.Content>

                <S.Rating>
                    {Array.from({ length: review.rating }).map((_, i) => (
                        <S.StarImg
                        key={i}
                        src={starFull}
                        alt="별점"
                        />
                    ))}
                </S.Rating>
              </S.ReviewContentWrapper>
            </S.FieldFull>
          </S.Body>

          <S.Footer>
            <S.SaveButton
              disabled={status === review.status}
              onClick={handleClickSave}
            >
              저장
            </S.SaveButton>
            <ConfirmModal
            isOpen={showConfirm}
            title="저장 확인"
            content={
            <>
                <p>해당 후기를 <strong>{status === 'BLIND' ? '블라인드' : '정상'}</strong> 처리하시겠습니까?</p>
                {status === 'BLIND' ? (
                <p>
                    블라인드 처리 시 사용자에게 보이지 않으며,<br />
                    상태는 <strong>블라인드</strong>로 변경됩니다.
                </p>
                ) : (
                <p>
                    복구 시 상태가 <strong>정상</strong>으로 변경되며,<br />
                    다시 사용자에게 노출됩니다.
                </p>
                )}
            </>
            }
            showCancel
            confirmText="확인"
            cancelText="취소"
            onConfirm={handleConfirmSave}
            onCancel={handleCancelSave}
        />

        {/* 결과 모달 */}
        <ConfirmModal
            isOpen={showResult}
            content={resultMessage}
            showCancel={false}
            confirmText="확인"
            onConfirm={handleResultClose}
        />
          </S.Footer>
        </S.Dialog>
      </S.Overlay>
  );
};

export default ReviewDetailModal;
