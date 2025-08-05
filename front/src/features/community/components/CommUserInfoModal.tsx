import type React from 'react';
import reportIcon from '../../../assets/images/ReportIcon.png';
import * as s from './CommUserInfoModalStyle';


interface Props {
  userName: string;
  badgeName: string;
  badgeImage: string;
  userProfile: string;
  onClose: () => void;
}

const CommUserInfoModal: React.FC<Props> = ({ userName, badgeName, badgeImage, userProfile, onClose }) => {
  return (
    <s.Overlay>
      <s.Modal>
        <s.TopBar>
          <s.Report><img src={reportIcon} alt="신고 아이콘" />신고하기</s.Report>
        </s.TopBar>

        <s.CenterBar>
            <s.ProfileImage src={userProfile} alt="유저 프로필" />
            <s.Info>
                <s.UserName>{userName}</s.UserName>
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