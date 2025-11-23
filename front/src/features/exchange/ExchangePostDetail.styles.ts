import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
//   background: #fff;
  padding: 24px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 60px;
`;

export const RightInfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #666;
`;

export const Category = styled.div`
  font-size: 14px;
  color: #999;
`;

export const ImageSliderWrapper = styled.div`
  position: relative;
  width: 350px;      // 원하는 고정 너비
  height: 350px;     // 원하는 고정 높이
  max-width: 350px;
//   overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageSlider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  border-radius: 8px;
  transition: transform 0.1s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SlideImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  scroll-snap-align: center;
  border-radius: 8px;
  background-color: #eee;
//   transition: transform 0.3s ease-in-out;
`;

export const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

export const IndicatorDot = styled.div<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#997BEB' : '#ccc')};
  transition: background-color 0.3s ease;
`;

export const InfoRowHorizontal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
  flex: 1;
`;

export const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #666;
//   margin-left: auto;
//   text-align: right;
  white-space: nowrap;
`;

export const TimeWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px; // 필요시 값 조절
  color: #666666;
  font-size: 14px;
  // gap: 4px;

`;

export const StatusIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 4px;
  vertical-align: middle;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
  align-items: center;
`;

export const Tag = styled.span`
  background-color: #B1FF90;
  width: 80px;
  height: 25px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #444;
//   padding: 8px 15px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: bold;
`;

interface TradeStatusProps {
    status: 'AVAILABLE' | 'ONGOING' | 'COMPLETED';
}


export const TradeStatus = styled.span<TradeStatusProps>`
    padding: 7px 14px;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 800;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    letter-spacing: -0.3px;
    box-shadow: 0 2px 3px rgba(115, 74, 255, 0.25), inset 0 0 2px rgba(255, 255, 255, 0.6);

    /* 글자 깜빡임 정의 */
    @keyframes text-blink {
        0% { color: #6037ff; }
        50% { color: #fa54a7ff; }
        100% { color: #6037ff; }
    }

    background: ${({ status }) => 
        status === 'AVAILABLE' ? 'linear-gradient(135deg, #ffbdf0 0%, #cdd8ff 100%)' :
        status === 'ONGOING' ? 'linear-gradient(135deg, #ffd27f 0%, #ffb85c 100%)' :
        '#e0e0e0'};
    
    color: ${({ status }) => 
        status === 'AVAILABLE' ? '#6037ff' :
        status === 'ONGOING' ? '#743d07ff' :
        '#444444'};
    
    animation: ${({ status }) =>
        status === 'AVAILABLE' ? 'text-blink 1.5s ease-in-out infinite' : 'none'};
`;


export const InfoItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

export const InfoDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 35px;
`;

export const ActionButton = styled.button<{ $main?: boolean }>`
  flex: 1;
  height: 60px;
  padding: 10px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${({ $main }) => ($main ? '#997BEB' : '#fff')};
  color: ${({ $main }) => ($main ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 16px;

  display: flex;       
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 25px;
    height:25px;
    object-fit: contain;
  }

  &:hover {
    background-color: ${({ $main }) => ($main ? '#7b65cc' : '#eaeaea')};
  }
`;

export const ManageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  margin-top: 20px;
  background-color: #997BEB;
  color: #FFFFFF;
  border: 1px solid #9A9A9A;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #997BEB;
`;

export const WriterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const WriterProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface ProfileImageProps {
  isDefault?: boolean;
  imageUrl?: string | null;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 48px;
  height: 48px;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 110%;
    object-fit: cover;   /* 비율 유지하며 꽉 채움 */
    object-position: center;
  }
`;

export const WriterName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const WriterLevel = styled.div`
  font-size: 13px;
  color: #777;
`;

export const Content = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap;
`;

export const DetailBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const DetailBox = styled.div`
  flex: 1;
  border: 1px solid #ddd;
//   border-radius: 8px;
  padding: 12px 16px;
//   background-color: #fafafa;
`;

export const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
`;

export const BoxIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;

export const BoxContent = styled.div`
  font-size: 13px;
  color: #444;
  line-height: 1.4;
`;

export const StatusDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 8px;  // 택배거래 태그와 간격
`;

export const StatusButton = styled.button<{ selected?: string }>`
  margin-left: 8px;
  padding: 4px 10px;
  font-size: 14px;
  border: 2px solid #997BEB;
  background-color: white;
  color: #444
  cursor: pointer;
  user-select: none;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;

export const StatusOptions = styled.ul`
  position: absolute;
  top: 30px;
  left: 8px;
  background: white;
  border: 1px solid #D9D9D9;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100px;
  z-index: 10;
`;

export const StatusOption = styled.li<{ selected?: boolean }>`
  padding: 8px 10px;
  font-size: 0.85rem;
  color: #000000;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};

  &:hover {
    background-color: #997BEB;
    color: white;
  }
`;

export const DropdownIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  object-fit: contain;
  vertical-align: middle;
`;

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  color: #9A9A9A;
  font-size: 14px;
  cursor: pointer;
  margin-left: 12px;
  text-decoration: underline;
`;
