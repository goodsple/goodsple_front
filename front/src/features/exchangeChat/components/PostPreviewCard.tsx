import * as S from './PostPreviewStyle';

type Preview = {
  title: string;
  thumb?: string;
  tags?: string[];
  /** '직거래' | '택배' 둘 중 하나만 */
  method?: '직거래' | '택배';
  /** 직거래 희망지역 텍스트 */
  regionText?: string;
};

export default function PostPreviewCard({ post }: { post: Preview }) {
  return (
    <S.Card>
      <S.Thumb
        style={{ backgroundImage: post.thumb ? `url(${post.thumb})` : undefined }}
        aria-label="게시글 썸네일"
      />
      <S.Right>
        <S.Title title={post.title}>{post.title}</S.Title>

        {(post.method || post.regionText) && (
          <S.MetaRow>
            {post.method && <S.Method $type={post.method}>{post.method}</S.Method>}
            {post.regionText && <S.Region>{post.regionText}</S.Region>}
          </S.MetaRow>
        )}

        {!!post.tags?.length && (
          <S.Tags>
            {post.tags.map((t) => (
              <S.Tag key={t}>{t}</S.Tag>
            ))}
          </S.Tags>
        )}
      </S.Right>
    </S.Card>
  );
}
