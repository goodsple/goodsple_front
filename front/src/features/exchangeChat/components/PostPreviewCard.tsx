import * as S from './PostPreviewStyle';

export default function PostPreviewCard({
  post,
}: { post: { title: string; thumb?: string; tags?: string[] } }) {
  return (
    <S.Card>
      <S.Thumb style={{ backgroundImage: post.thumb ? `url(${post.thumb})` : undefined }} />
      <div style={{ minWidth: 0 }}>
        <S.Title>{post.title}</S.Title>
        {!!post.tags?.length && (
          <S.Tags>
            {post.tags.map(t => <S.Tag key={t}>{t}</S.Tag>)}
          </S.Tags>
        )}
      </div>
    </S.Card>
  );
}
