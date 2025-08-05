import React, { useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import ProhibitedWordsFilter from '../components/ProhibitedWordsFilter';
import ProhibitedWordsTable from '../components/ProhibitedWordsTable';
import { mockProhibitedWords } from '../mock/WordsData';
import AddProhibitedWordsModal from '../modal/AddProhibitedWordsModal';
import RemoveProhibitedWordsModal from '../modal/RemoveProhibitedWordsModal';
import * as s from './AdminProhibitedWordsPageStyle';

const AdminProhibitedWordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);


  const itemsPerPage = 10;

  const filteredData = mockProhibitedWords.filter((item) => {
    const wordMatch = searchTerm ? item.word.includes(searchTerm) : true;
    const dateMatch =
      (!startDate || item.date >= startDate) &&
      (!endDate || item.date <= endDate);
    return wordMatch && dateMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = paginatedData.map((item) => item.id);
    if (checked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    } else {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
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
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {isAddModalOpen && (
        <AddProhibitedWordsModal onClose={() => setIsAddModalOpen(false)} />
        )}

        {isRemoveModalOpen && (
        <RemoveProhibitedWordsModal
            selectedIds={selectedIds}
            onClose={() => setIsRemoveModalOpen(false)}
        />
        )}

    </s.PageWrapper>

    
  );
};

export default AdminProhibitedWordsPage;
