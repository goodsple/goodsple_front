import React, { useEffect, useState } from 'react';
import Pagination from '../../../../components/common/pagination/Pagination';
import CommunityFilter from '../components/CommunityFilter';
import CommunityTable from '../components/CommunityTable';
import { mockCommunityData } from '../mock/CommData';
import * as s from './AdminCommunityPageStyle';

const AdminCommunityPage: React.FC = () => {
    const [searchRoomId, setSearchRoomId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const filteredData = mockCommunityData.filter((item) => {
        const roomMatch = searchRoomId ? item.roomId === searchRoomId : true;
        const dateMatch =
        (!startDate || item.date >= startDate) &&
        (!endDate || item.date <= endDate);
        return roomMatch && dateMatch;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchRoomId, startDate, endDate]);


    return (
            <s.PageWrapper>
                <CommunityFilter
                    searchRoomId={searchRoomId}
                    setSearchRoomId={setSearchRoomId}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />

                <CommunityTable data={paginatedData} />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}

            </s.PageWrapper>

        );
};

export default AdminCommunityPage;
