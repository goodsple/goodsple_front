import * as S from './ProfileIntroStyle';

export default function ProfileIntro({
  nickname, avatar, levelText,
}: { nickname: string; avatar?: string; levelText?: string }) {
  return (
    <S.Wrap>
      <S.Avatar style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }} />
      <S.Name>{nickname}</S.Name>
      {levelText && <S.Level>{levelText}</S.Level>}
    </S.Wrap>
  );
}
