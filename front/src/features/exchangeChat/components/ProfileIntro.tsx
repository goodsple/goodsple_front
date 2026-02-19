import * as S from './ProfileIntroStyle';

export default function ProfileIntro({
  nickname,
  avatar,
  levelText,
  badgeImageUrl,
  verified,
}: {
  nickname: string;
  avatar?: string;
  levelText?: string;
  badgeImageUrl?: string;
  verified?: boolean;
}) {
  const normalizedLevel = levelText?.trim().toLowerCase();
  const displayLevel =
    normalizedLevel && normalizedLevel !== 'admin' && normalizedLevel !== 'user'
      ? levelText
      : undefined;

  return (
    <S.Wrap>
      <S.Avatar style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }} />
      <S.NameRow>
        <S.Name>{nickname}</S.Name>
        {verified && <S.Badge aria-label="인증됨" />}
      </S.NameRow>
      {badgeImageUrl && <S.BadgeImage src={badgeImageUrl} alt="뱃지 이미지" />}
      {displayLevel && <S.Level>{displayLevel}</S.Level>}
    </S.Wrap>
  );
}
