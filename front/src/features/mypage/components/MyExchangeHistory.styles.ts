import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 60px;
  box-sizing: border-box;
`;

/* ================= 탭 / 필터 ================= */

export const TabWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-bottom: 2px solid #ccc;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 32px;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#997BEB' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
  font-size: 20px;
`;

export const TabFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  padding-bottom: 4px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

/* ================= 테이블 ================= */

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th,
  td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }

  th {
    font-weight: bold;
  }
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

/* ================= 관리 버튼 ================= */

export const ManageButton = styled.button`
  width: 80px;
  padding: 8px 10px;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: #997beb;
  color: #fff;
  margin: 0 4px;

  &:hover {
    background-color: #8466e3;
  }
`;

/* ================= 후기 버튼 (핵심) ================= */

export const ReviewButton = styled.button<{ disabled?: boolean }>`
  width: 140px;
  padding: 10px 12px;
  font-size: 13px;
  border-radius: 10px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : '#444')};
  color: ${({ disabled }) => (disabled ? '#999' : '#fff')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : '#333')};
  }
`;

/* ================= 거래상태 드롭다운 ================= */

export const StatusDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const StatusButton = styled.button`
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DropdownIcon = styled.img`
  width: 12px;
  height: 12px;
`;

export const StatusOptions = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style: none;
  padding: 4px 0;
  z-index: 10;
`;

export const StatusOption = styled.li<{ $selected?: boolean }>`
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? '#f0f0f0' : '#fff')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

/* ================= 모달 ================= */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const ModalDescription = styled.p`
  font-size: 13px;
  color: #777;
  margin: -6px 0 14px 5px;
`;

export const UserList = styled.ul`
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const UserItem = styled.li<{ $selected: boolean }>`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? '#f0ecff' : '#fff')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const NicknameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Nickname = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export const BadgeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const LastMessageTime = styled.div`
  font-size: 12px;
  color: #999;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

export const ModalButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #997beb;
  color: #fff;

  &:hover {
    background-color: #8466e3;
  }
`;
