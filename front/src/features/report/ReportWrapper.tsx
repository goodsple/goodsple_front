import ReportModal from '../../components/common/modal/ReportModal'
import axiosInstance from '../../api/axiosInstance'
import { useState } from 'react'


/**
 * 신고 버튼 클릭 시 모달을 띄우는 호스트 컴포넌트
 */
export default function ReportWrapper() {
    // 모달 열림/닫힘 상태
    const [isReportOpen, setIsReportOpen] = useState(false)
  
    // TODO: 실제 로그인 유저 ID, 신고 대상 정보, 타겟 타입/ID는
    // 인증/라우트 파라미터 등에서 받아와야 합니다.
    const reporterId = 1             // 예시: 로그인된 유저 ID
    const reportTargetUserId = 2     // 예시: 신고 대상 유저 ID
    const targetType = 'POST'        // 예시: "POST", "COMMENT"
    const targetId = 123             // 예시: 타겟 엔티티 ID
  
    const openModal = () => setIsReportOpen(true)
    const closeModal = () => setIsReportOpen(false)
  
    const handleConfirm = (selectedIds: number[], detailText: string) => {
      // axios 인스턴스로 신고 API 호출
      axiosInstance
        .post(
          `/reports?${selectedIds.map(id => `reasonIds=${id}`).join('&')}`,
          {
            reporterId,
            reportTargetUserId,
            targetType,
            targetId,
            reportDescription: detailText,
          }
        )
        .then(res => {
          if (res.status === 201 || res.status === 200) {
            alert('신고가 접수되었습니다.')
            closeModal()
          } else {
            throw new Error('신고 실패')
          }
        })
        .catch(err => {
          console.error(err)
          alert('신고 중 오류가 발생했습니다.')
        })
    }
  
    return (
      <>
        {/* 신고 버튼 */}
        <button onClick={openModal}>신고하기</button>
  
        {/* 모달 */}
        {isReportOpen && (
          <ReportModal
            onConfirm={handleConfirm}
            onCancel={closeModal}
          />
        )}
      </>
    )
}
  