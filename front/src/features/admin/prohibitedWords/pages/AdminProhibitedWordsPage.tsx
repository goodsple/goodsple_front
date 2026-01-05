import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import Pagination from '../../../../components/common/pagination/Pagination';
import ProhibitedWordsFilter from '../components/ProhibitedWordsFilter';
import type { ProhibitedWord } from '../components/ProhibitedWordsTable';
import ProhibitedWordsTable from '../components/ProhibitedWordsTable';
import AddProhibitedWordsModal from '../modal/AddProhibitedWordsModal';
import RemoveProhibitedWordsModal from '../modal/RemoveProhibitedWordsModal';
import * as s from './AdminProhibitedWordsPageStyle';

const AdminProhibitedWordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [words, setWords] = useState<ProhibitedWord[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const itemsPerPage = 10;

  // 전체 금칙어 조회
  const fetchWords = async () => {
    try {
      const response = await axiosInstance.get<ProhibitedWord[]>('/admin/prohibited-words');
      setWords(response.data);
    } catch (err) {
      console.error('금칙어 조회 실패', err);
      alert('금칙어 조회에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // 필터 적용
  const filteredData = words.filter((item) => {
    const wordMatch = searchTerm ? item.word.includes(searchTerm) : true;
    const itemDate = new Date(item.wordCreatedAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);
    return wordMatch && dateMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);

  // 체크박스 선택 로직
  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = paginatedData.map((item) => item.wordId);
    setSelectedIds((prev) =>
      checked ? Array.from(new Set([...prev, ...currentPageIds])) : prev.filter((id) => !currentPageIds.includes(id))
    );
  };

  // 금칙어 추가
  const handleAddSuccess = async () => {
    await fetchWords();
    setSelectedIds([]);
  };

  // 금칙어 삭제
  const handleDeleteSuccess = async () => {
    if (selectedIds.length === 0) return;

    try {
      await axiosInstance.delete('/admin/prohibited-words', { data: selectedIds });
      setSelectedIds([]);
      await fetchWords();
    } catch (err) {
      console.error('금칙어 삭제 실패', err);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 금칙어 활성화/비활성화 토글 
  const handleToggleActive = async (id: number) => { 
    try {
      await axiosInstance.put(`/admin/prohibited-words/${id}/toggle`); 
      await fetchWords(); 
    } catch (err) {
      console.error('금칙어 활성화/비활성화 실패', err); 
      alert('상태 변경에 실패했습니다. 다시 시도해주세요.'); 
    } 
  };

  return (
    <s.PageWrapper>
      <ProhibitedWordsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onClickAdd={() => setIsAddModalOpen(true)}
        onClickDelete={() => {
          if (selectedIds.length === 0) {
            alert('삭제할 금칙어를 선택하세요.');
            return;
          }
          setIsRemoveModalOpen(true);
        }}
      />

      <ProhibitedWordsTable
        data={paginatedData}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onToggleActive={handleToggleActive}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {isAddModalOpen && (
        <AddProhibitedWordsModal
          onClose={() => setIsAddModalOpen(false)}
          onAddSuccess={handleAddSuccess} 
        />
      )}

      {isRemoveModalOpen && (
        <RemoveProhibitedWordsModal
          selectedIds={selectedIds}
          onClose={() => setIsRemoveModalOpen(false)}
          onDeleteSuccess={handleDeleteSuccess} 
        />
      )}
    </s.PageWrapper>
  );
};

export default AdminProhibitedWordsPage;
