import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  min-width: 1200px; /* 최소 너비 */
  margin: 0 auto;
  padding: 40px 20px 60px;
  box-sizing: border-box;
`;

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

export const Table = styled.table`
  width: 100%;
  table-layout: fixed; 
  border-collapse: collapse;

  th, td {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #D9D9D9;
  }

  th {
    // background-color: #f9f9f9;
    font-weight: bold;
  }
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ManageButton = styled.button`
  width: 100px;
  margin: 5px;
  padding: 5px 15px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #9A9A9A;
  font-size: 14px;

  &:hover {
    background-color: #997BEB;
    color: white;
  }
`;

export const StatusDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 8px;
`;

export const StatusButton = styled.button<{ selected?: string }>`
  width: 102px;
  margin-left: 8px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #9A9A9A;
  background-color: white;
  color: #444;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StatusOptions = styled.ul`
  position: absolute;
  top: 30px;
  left: 8px;
  background: white;
  border: 1px solid #9A9A9A;
  padding: 0;
  margin: 0;
  width: 100px;
  z-index: 10;
`;

export const StatusOption = styled.li<{ $selected?: boolean }>`
  padding: 8px 10px;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  text-align: left;  
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};

  &:hover {
    background-color: #997BEB;
    color: white;
  }
`;

export const DropdownIcon = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  object-fit: contain;
  padding-left: 10px;
`;


export const TabFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
`

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
//   border-bottom: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  padding-bottom: 4px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

/* ===============================
   거래상대 선택 모달
================================ */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 413px;
  height: 597px;
  background: #ffffff;
  border-radius: 15px;
  padding: 24px 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

/* 모달 제목_최근 대화한 계정 */
export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0px 18px 5px;
`;

/* 미사용 */
export const RecentTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
`;

/* 사용자 리스트 */
export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

/* 개별 사용자 아이템 */
export const UserItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 12px;
  // border-radius: 12px;
  cursor: pointer;

  background-color: ${({ $selected }) => ($selected ? 'rgba(153, 123, 235, 0.5)' : 'transparent')};
  color: #444444;

  border-bottom: 1px solid #D9D9D9;

  &:hover {
    background-color: ${({ $selected }) => $selected ? 'rgba(153, 123, 235, 0.5)' : '#F5F5F5'};
  }

`;

// 'rgba(153, 123, 235, 0.5)'

/* 프로필 이미지 */
export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

/* 사용자 정보 영역 */
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* 닉네임 + 배지 */
export const NicknameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Nickname = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const BadgeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

/* 마지막 대화 시점 */
export const LastMessageTime = styled.span`
  font-size: 12px;
  color: #999999;
`;

/* 하단 버튼 영역 */
export const ModalFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

/* 거래상대 선택 모달 버튼 */
export const ModalButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  height: 44px;
  border-radius: 15px;
  border: 1px solid #444444;
  background-color: ${({ $active }) => ($active ? '#444444' : '#FFFFFF')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#444444')};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #444444;
    color: #ffffff;
  }
`;

