import * as S from './ProfileIntroStyle';

export default function ProfileIntro({
  nickname,
  avatar,
  levelText,
  verified,
}: {
  nickname: string;
  avatar?: string;
  levelText?: string;
  verified?: boolean;
}) {
  return (
    <S.Wrap>
      <S.Avatar style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }} />
      <S.NameRow>
        <S.Name>{nickname}</S.Name>
        {verified && <S.Badge aria-label="인증됨" />}
      </S.NameRow>
      {levelText && <S.Level>{levelText}</S.Level>}
    </S.Wrap>
  );
}
