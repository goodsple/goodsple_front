import * as Wn from "./WhatsNewSectionStyle";

const dummyPosts = [
  {
    id: 1,
    title: "뉴진스 하입보이 포카 교환해요",
  },
  {
    id: 2,
    title: "세븐틴 콘서트 머플러 나눔",
  },
  {
    id: 3,
    title: "원피스 일러스트 아크릴 키링 교환",
  },
  {
    id: 4,
    title: "리그 오브 레전드 한정 스킨 굿즈 판매",
  },
  {
    id: 5,
    title: "야구 구단 응원봉 교환 (두산 → 한화)",
  },
  {
    id: 6,
    title: "마블 영화 아트북 양도",
  },
  {
    id: 7,
    title: "엑소 바시티 양도",
  },
  {
    id: 8,
    title: "BTS dvd 양도",
  },
];

const WhatsNewSection = () => {
    return (
      <Wn.Section>
        <Wn.Inner>
          <Wn.SectionHeader>
            <Wn.Title>What&apos;s new?</Wn.Title>
          </Wn.SectionHeader>
  
          <Wn.CardWrapper>
            <Wn.CardGrid>
              {dummyPosts.map((post) => (
                <Wn.Card key={post.id}>
                  <Wn.Thumbnail />
                  <Wn.PostTitle>{post.title}</Wn.PostTitle>
                </Wn.Card>
              ))}
            </Wn.CardGrid>
            <Wn.PaginationRow>
                <Wn.PageArrowButton>{'←'}</Wn.PageArrowButton>

                <Wn.PageCenter>
                    <span className="current">01</span>
                    <span className="dash">—</span>
                    <span className="total">02</span>
                </Wn.PageCenter>

                <Wn.PageArrowButton>{'→'}</Wn.PageArrowButton>
            </Wn.PaginationRow>
          </Wn.CardWrapper>
        </Wn.Inner>
      </Wn.Section>
    );
  };
  

export default WhatsNewSection;
