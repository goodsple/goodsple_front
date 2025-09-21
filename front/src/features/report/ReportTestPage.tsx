import { useReport } from './ReportContext' 

export default function ReportTestPage() {
  const { openReport } = useReport()

  return (
    <div style={{ padding: 24 }}>
      <h2>Report Dev Test</h2>
      <p>아래 버튼으로 각 타겟 유형에 대해 신고 모달을 테스트하세요.</p>

      <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <button
          onClick={() =>
            openReport({ targetType: 'POST', targetId: 123, reportTargetUserId: 2 })
          }
        >
          게시글 신고(POST#123 → user#2)
        </button>

        <button
          onClick={() =>
            openReport({ targetType: 'REVIEW', targetId: 987, reportTargetUserId: 15 })
          }
        >
          리뷰 신고(REVIEW#987 → user#15)
        </button>

        <button
          onClick={() =>
            openReport({ targetType: 'USER', targetId: 42, reportTargetUserId: 42 })
          }
        >
          유저 신고(USER#42)
        </button>
      </div>
    </div>
  )
}
