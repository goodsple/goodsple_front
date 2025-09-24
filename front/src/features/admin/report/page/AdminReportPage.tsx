import React, { useEffect, useMemo, useState } from 'react';
import SearchControls from '../components/SearchControls';
import ReportTable from '../components/ReportTable';
import Pagination from '../../../../components/common/pagination/Pagination';
import ReportDetailModal from '../modal/ReportDetailModal';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';
import * as S from './AdminReportPageStyle';
import axiosInstance from '../../../../api/axiosInstance';
import { buildStatusUpdateRequest } from '../types/adminReport';

import {
  // UI 모델
  type AdminReport,
  type SearchCriteria,
  // 서버 DTO & 매퍼
  type AdminReportListItemDTO,
  mapListItemToAdminReport,
  frontTargetToServer
} from '../types/adminReport';

const PAGE_SIZE = 10;

interface AdminReportListResponseDTO {
  items: AdminReportListItemDTO[];
  total: number; // 전체 건수
  page: number;  // 0-base
  size: number;
}

const AdminReportPage: React.FC = () => {
  // 목록/검색 상태
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(false);

  // 페이지는 UI에서 1-base로 관리(서버는 0-base라고 가정)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [criteria, setCriteria] = useState<SearchCriteria>({
    keyword: '',
    fromDate: '',
    toDate: '',
    targetTypes: [],
    statuses: [],
  });

  // 상세 모달 상태
  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 결과 알림 모달
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // 총 페이지 계산
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / PAGE_SIZE));
  }, [total]);

  // 목록 조회
  const fetchReports = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: page - 1, // 서버 0-base
        size: PAGE_SIZE,
      };

      if (criteria.keyword) params.keyword = criteria.keyword;
      if (criteria.fromDate) params.createdFrom = criteria.fromDate;
      if (criteria.toDate) params.createdTo = criteria.toDate;
      if (criteria.targetTypes && criteria.targetTypes.length) {
        params.targetTypes = criteria.targetTypes.map(frontTargetToServer);
      }
      if (criteria.statuses && criteria.statuses.length) {
        const set = new Set<string>();
        for (const s of criteria.statuses) {
          if (s === 'pending') {
            set.add('pending');
            set.add('processing');
          } else if (s === 'processed') {
            set.add('resolved');
            set.add('rejected');
          }
        }
        params.statuses = Array.from(set); // ['pending','processing'] / ['resolved','rejected'] / 둘 다
      }

      const res = await axiosInstance.get<AdminReportListResponseDTO>('/admin/reports', { params });
      const list = res.data.items.map(mapListItemToAdminReport);
      setReports(list);
      setTotal(res.data.total ?? list.length);
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message ?? '신고 목록 조회 중 오류가 발생했습니다.');
      setReports([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(criteria)]);

  // 검색 폼에서 검색 실행
  const handleSearch = (c: SearchCriteria) => {
    setCriteria(c);
    setPage(1);
  };

  // 테이블 “처리” 버튼 → 상세 모달 열기(조치 선택 유도)
  const handleProcess = (id: string) => {
    const target = reports.find(r => r.reportId === id);
    if (!target) return;
    setSelectedReport(target);
    setIsDetailOpen(true);
  };

  // 테이블 행 클릭 → 상세 모달 열기
  const handleRowClick = (report: AdminReport) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  // 상세 모달 저장(상태/조치 업데이트)

  const handleSave = async ({
    reportId, status, action,
  }: {
    reportId: string;
    status: AdminReport['status'];
    action?: AdminReport['action'];
  }) => {
    try {
      const body = buildStatusUpdateRequest(status, action); // DB 라벨 변환까지 포함
      await axiosInstance.put(`/admin/reports/${reportId}/status`, body);

      // 서버 값(action_taken/processed_at) 반영하려면 재조회가 정답
      await fetchReports();

      setIsDetailOpen(false);
      setResultMessage('변경 사항이 저장되었습니다.');
      setShowResult(true);
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message ?? '상태 변경 중 오류가 발생했습니다.');
    }
  };


  return (
    <S.Container>
      <SearchControls onSearch={handleSearch} />
      <S.TableWrap>
        <ReportTable
          reports={reports}
          loading={loading}
          onProcess={handleProcess}
          onRowClick={handleRowClick}
        />
      </S.TableWrap>

      <S.PaginationWrap>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </S.PaginationWrap>

      <ReportDetailModal
        isOpen={isDetailOpen}
        report={selectedReport}
        onClose={() => setIsDetailOpen(false)}
        onSave={handleSave}
      />

      <ConfirmModal
        isOpen={showResult}
        content={resultMessage}
        showCancel={false}
        confirmText="확인"
        onConfirm={() => setShowResult(false)}
      />
    </S.Container>
  );
};

export default AdminReportPage;
