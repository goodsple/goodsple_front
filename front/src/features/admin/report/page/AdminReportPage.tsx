import React, { useState, useEffect } from 'react';
import SearchControls from '../components/SearchControls';
import ReportTable from '../components/ReportTable';
import Pagination from '../../../../components/common/pagination/Pagination';
import type { AdminReport } from '../types/adminReport';
import type { SearchCriteria } from '../types/adminReport';
import { mockReports } from '../mock/mockReports';
import * as S from './AdminReportPageStyle';
import axiosInstance from '../../../../api/axiosInstance';
import ReportDetailModal from '../modal/ReportDetailModal';
import ConfirmModal from '../../../../components/common/modal/ConfirmModal';

const AdminReportPage: React.FC = () => {
  const [reports, setReports]   = useState<AdminReport[]>([]);
  const [loading, setLoading]   = useState(false);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const [criteria, setCriteria] = useState<SearchCriteria>({
      keyword: '',
      fromDate: '',
      toDate: '',
      targetTypes: [],
      statuses: [],
  });

  const [isModalOpen, setIsModalOpen]       = useState(false);
  
  // 상세 모달 관리
  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 저장 후 결과 모달
  const [showResult, setShowResult]   = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  
  const fetchReports = async () => {
      setLoading(true);
      try {
      // 실제 API 있으면 이 부분 사용
      // const res = await axiosInstance.get<{ items: AdminReport[]; totalPages: number }>('/admin/reports', {
      //   params: { page, size: 10, ...criteria }
      // });
      // setReports(res.data.items);
      // setTotalPages(res.data.totalPages);

      // 지금은 mock
      setReports(mockReports);
      setTotalPages(1);
      } finally {
      setLoading(false);
      }
  };

    useEffect(() => {
        fetchReports();
        }, [page, criteria]);

    const handleSearch = (c: SearchCriteria) => {
        setCriteria(c); 
        setPage(1);
    };

    const handleProcess = async (id: string) => {
        // 실제 처리 API 호출
        // await axiosInstance.put(`/admin/reports/${id}/process`);
        // 임시로 mock 상태 변경
        setReports(rs => 
          rs.map(r =>
            r.reportId === id 
            ? { ...r, status: 'PROCESSED',
             handledAt: new Date().toISOString() } : r));
    };

    // 테이블에서 행 클릭 → 상세 모달 열기
    const handleRowClick = (report: AdminReport) => {
        // 상세 모달 열기 로직
        setSelectedReport(report);
        setIsDetailOpen(true);
    };

    // 상세 모달에서 저장
    const handleSave = async ({
      reportId,
      status,
      action,
    }: {
      reportId: string;
      status: AdminReport['status'];
      action: AdminReport['action'];
    }) => {
      // 실제 API
      // await axiosInstance.put(`/admin/reports/${reportId}`, { status, action });
      // 목록 갱신
      setReports(rs =>
        rs.map(r =>
          r.reportId === reportId
            ? { ...r, status, action, handledAt: new Date().toISOString() }
            : r,
        ),
      );
      setIsDetailOpen(false);
  
      setResultMessage('변경 사항이 저장되었습니다.');
      setShowResult(true);
    };

    const handleResultConfirm = () => {
      setShowResult(false);
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
        <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
        />
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
