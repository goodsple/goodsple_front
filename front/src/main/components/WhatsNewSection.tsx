import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import * as Wn from "./WhatsNewSectionStyle";

type PostItem = {
  exchangePostId: number;
  exchangePostTitle: string;
  imageUrl?: string | null;
};

const WhatsNewSection = () => {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await axiosInstance.get<PostItem[]>("/posts");
          const list = res.data ?? [];
          setPosts(list);
        } catch (e) {
          console.error("What's New 조회 실패", e);
        }
      };
      fetchPosts();
    }, []);

    const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const pagePosts = posts.slice(startIndex, startIndex + pageSize);

    return (
      <Wn.Section>
        <Wn.Inner>
          <Wn.SectionHeader>
            <Wn.Title>What&apos;s new?</Wn.Title>
          </Wn.SectionHeader>
  
          <Wn.CardWrapper>
            <Wn.CardGrid>
              {pagePosts.map((post) => (
                <Wn.Card
                  key={post.exchangePostId}
                  onClick={() => navigate(`/exchange/detail/${post.exchangePostId}`)}
                >
                  <Wn.Thumbnail src={post.imageUrl ?? undefined} alt="게시글 썸네일" />
                  <Wn.PostTitle>{post.exchangePostTitle}</Wn.PostTitle>
                </Wn.Card>
              ))}
            </Wn.CardGrid>
            <Wn.PaginationRow>
                <Wn.PageArrowButton
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  {'←'}
                </Wn.PageArrowButton>

                <Wn.PageCenter>
                    <span className="current">{String(currentPage).padStart(2, "0")}</span>
                    <span className="dash">—</span>
                    <span className="total">{String(totalPages).padStart(2, "0")}</span>
                </Wn.PageCenter>

                <Wn.PageArrowButton
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  {'→'}
                </Wn.PageArrowButton>
            </Wn.PaginationRow>
          </Wn.CardWrapper>
        </Wn.Inner>
      </Wn.Section>
    );
  };
  

export default WhatsNewSection;
