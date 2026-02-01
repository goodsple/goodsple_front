export type ReviewType = {
    id: number;
    exchangePostId: number;
    postTitle: string;
    date: string;
    rating: number;
    content: string;
    images: string[];
    thumbnail: string | null;
    writerId?: number | null;
    targetUserId?: number | null;
  };
