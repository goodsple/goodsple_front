import type React from 'react';
import reportIcon from '../../../assets/images/ReportIcon.png';
import * as s from './CommUserInfoModalStyle';
import { useReport } from '../../report/ReportContext';


interface Props {
  userId: number;  
  nickname: string;
  badgeName: string;
  badgeImage: string;
  userProfile: string;
  onClose: () => void;
}

const CommUserInfoModal: React.FC<Props> = ({userId, nickname, badgeName, badgeImage, userProfile, onClose }) => {
  
  const { openReport } = useReport();

  const onClickReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userId == null) {
      alert('유저 ID가 없어 신고할 수 없어요.');
      return;
    }
    openReport({
      targetType: 'USER',
      targetId: Number(userId),
      reportTargetUserId: Number(userId),
    });
    onClose();
  };

  return (
    <s.Overlay>
      <s.Modal>
        <s.TopBar>
          <s.Report onClick={onClickReport} role="button" tabIndex={0}>
            <img src={reportIcon} alt="신고 아이콘" />신고하기</s.Report>
        </s.TopBar>

        <s.CenterBar>
            <s.ProfileImage src={userProfile} alt="유저 프로필" />
            <s.Info>
                <s.UserName>{nickname}</s.UserName>
                <s.BadgeInfo>
                    <span>{badgeName}</span>
                    <s.BadgeImage src={badgeImage} alt="뱃지" />
                </s.BadgeInfo>
            </s.Info>
        </s.CenterBar>

        <s.BtnGroup>
          <s.CancelBtn onClick={onClose}>취소</s.CancelBtn>
          <s.ChatBtn>1:1 채팅</s.ChatBtn>
        </s.BtnGroup>
      </s.Modal>
    </s.Overlay>
  );
};

export default CommUserInfoModal;