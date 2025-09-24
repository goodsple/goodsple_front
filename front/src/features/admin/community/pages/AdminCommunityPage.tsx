import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import Pagination from '../../../../components/common/pagination/Pagination';
import type { ChatRoom } from '../components/CommunityFilter';
import CommunityFilter from '../components/CommunityFilter';
import type { CommunitySummary } from '../components/CommunityTable';
import CommunityTable from '../components/CommunityTable';
import * as s from './AdminCommunityPageStyle';

const AdminCommunityPage: React.FC = () => {
  const [searchRoomId, setSearchRoomId] = useState<string>(''); 
  const [startDate, setStartDate] = useState<string>('');       
  const [endDate, setEndDate] = useState<string>('');           
  const [data, setData] = useState<CommunitySummary[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // JWT 체크
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  }, []);

  // 채팅방 목록 가져오기
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await axiosInstance.get('/admin/community/rooms');
        setChatRooms(res.data);
      } catch (err: any) {
        console.error('채팅방 목록 불러오기 실패:', err);
      }
    };
    fetchChatRooms();
  }, []);

  // 필터 조건에 맞는 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: Record<string, string | undefined> = {
          roomId: searchRoomId.trim() || undefined,  
          startDate: startDate.trim() || undefined,   
          endDate: endDate.trim() || undefined,       
        };

        console.log("요청 params:", params);
        const res = await axiosInstance.get('/admin/community/summary', { params });
        console.log('서버 응답:', res.data);
        setData(res.data);
        setCurrentPage(1); // 필터 변경 시 페이지 초기화 
      } catch (err: any) {
        console.error('데이터 불러오기 실패:', err);
      }
    };

    fetchData();
  }, [searchRoomId, startDate, endDate]);

  // 현재 페이지 데이터
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <s.PageWrapper>
      <CommunityFilter
        searchRoomId={searchRoomId}
        setSearchRoomId={setSearchRoomId}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        chatRooms={chatRooms}
      />

      <CommunityTable data={currentData} itemsPerPage={itemsPerPage} />

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
