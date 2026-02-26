import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import type { UserInfo } from '../types/myProfile';

import profileImg from '../../../assets/images/default_profile.png';
import LV1 from '../../../assets/images/LV1.png';
import LV2 from '../../../assets/images/LV2.png';
import LV3 from '../../../assets/images/LV3.png';
import LV4 from '../../../assets/images/LV4.png';
import LV5 from '../../../assets/images/LV5.png';
import * as s from './MyPageStyle';

const badgeImages: Record<number, string> = {
  1: LV1,
  2: LV2,
  3: LV3,
  4: LV4,
  5: LV5
};

interface MyScoreResponseDto {
  userId: number;
  trustScore: number;
  reviewScore: number;
  penaltyScore: number;
  totalScore: number;
  badgeLevel: number;
  badgeName: string;
  badgeImageUrl: string;
  nextMinScore: number | null;
  scoreGap: number;
}

const MyPage:React.FC = () => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [myScore, setMyScore] = useState<MyScoreResponseDto | null>(null);

    // 페이지 접속 시 유저 정보 가져오기
    useEffect(() => {
        const fetchUser = async () => {
          try {
            // '/users/me' 경로 확인 (뒤에 슬래시 빼는 게 안전)
            const res = await axiosInstance.get<UserInfo>('/users/me');
            setUserInfo(res.data);

            // 뱃지 정보
            const badgeRes = await axiosInstance.get<MyScoreResponseDto>('/badge/myscores');
            setMyScore(badgeRes.data);

          } catch (err) {
            console.error('유저 정보 조회 실패', err);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, [myScore]);

    const handleEditProfile = () => {
        navigate(`/editprofile`);
    };

    return(
        loading || !userInfo ? (
            <s.NonData>
              {loading ? '로딩 중…' : '사용자 정보를 불러올 수 없습니다.'}
            </s.NonData>
          ) : (
        <s.MyPageContainer>  {/* 전체 div */}
            <s.ProfileSection> {/* 위 사용자 정보 박스 / 게시글? 갯수 표시 박스 */}
                <s.MyProfile>
                    {/* 프로필 사진 / 닉네임 / 등급, 뱃지 / 내 정보 수정 버튼 */}
                    <s.ProfileImage isDefault={!userInfo.profileImageUrl}>
                    <img
                        src={userInfo.profileImageUrl || profileImg}
                        alt={userInfo.profileImageUrl ? '업로드된 프로필 이미지' : '기본 프로필 이미지'}
                    />
                    </s.ProfileImage>
                       {userInfo.nickname}
                    <s.profileBadge>
                       {myScore && (
                            <>
                            LV{myScore.badgeLevel}. {myScore.badgeName}
                            <img
                                src={badgeImages[myScore.badgeLevel]}
                                alt="뱃지 이미지"
                            />
                            </>
                        )}
                    </s.profileBadge>

                    <s.EditProfileButton type="button" onClick={() => handleEditProfile()}>
                        내 정보 수정 
                    </s.EditProfileButton>

                </s.MyProfile>
                <s.outProfileInfo>
                    <s.stasItem to="/mypage">
                        <s.stasNum>0</s.stasNum>
                        게시글
                    </s.stasItem>
                    <s.stasItem to="/mypage">
                        <s.stasNum>0</s.stasNum>
                        북마크
                    </s.stasItem>
                    <s.stasItem to="/mypage">
                        <s.stasNum>0</s.stasNum>
                        후기
                    </s.stasItem>
                </s.outProfileInfo>
            </s.ProfileSection>

            <s.LinkList> {/* 다른 페이지들로 넘어갈 수 있는 링크 박스들 */}
                <s.Activity>
                    <s.ActivityHeader>나의 활동</s.ActivityHeader>
                    <s.StyledHr />
                    <s.ActivityLink to="/reviews">후기</s.ActivityLink>
                    <s.ActivityLink to="/mypage">이벤트존 활동 내역</s.ActivityLink>
                    <s.ActivityLink to="/mypage">내 알림</s.ActivityLink>
                    <s.ActivityLink to="/bookmarkPage">찜 목록</s.ActivityLink>
                </s.Activity>

                <s.Activity>
                    <s.ActivityHeader>거래 관리</s.ActivityHeader>
                    <s.StyledHr />
                    <s.ActivityLink to="/exchange">내 거래글</s.ActivityLink>
                    <s.ActivityLink to="/exchange/history">거래 내역</s.ActivityLink>
                    <s.ActivityLink to="/mypage">줄서기 내역</s.ActivityLink>
                    <s.ActivityLink to="/mypage">나의 낙찰 목록</s.ActivityLink>
                </s.Activity>

                <s.Activity>
                    <s.ActivityHeader>내 계정 관리</s.ActivityHeader>
                    <s.StyledHr />
                    <s.ActivityLink to="/badgeguide">내 등급(뱃지)</s.ActivityLink>
                    <s.ActivityLink to="/mypage">내 채팅목록</s.ActivityLink>
                </s.Activity>
            </s.LinkList>

        </s.MyPageContainer>
    )
    );
}

export default MyPage;