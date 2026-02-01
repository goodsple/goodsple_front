import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";

export type ReviewSummary = {
  id: number;
  exchangePostId: number;
  postTitle: string;
  date: string;
  rating: number;
  content: string;
  thumbnail: string | null;
  images: string[];
};

export type ReviewDetail = ReviewSummary & {
  writerId: number;
  targetUserId: number;
};

export type ReviewCreatePayload = {
  exchangePostId: number;
  rating: number;
  content: string;
  imageUrls: string[];
};

export type ReviewUpdatePayload = {
  rating: number;
  content: string;
  imageUrls: string[];
};

export const getWrittenReviews = async (): Promise<ReviewSummary[]> => {
  const res = await axiosInstance.get("/reviews/written");
  return res.data ?? [];
};

export const getReceivedReviews = async (): Promise<ReviewSummary[]> => {
  const res = await axiosInstance.get("/reviews/received");
  return res.data ?? [];
};

export const getReviewDetail = async (reviewId: number): Promise<ReviewDetail> => {
  const res = await axiosInstance.get(`/reviews/${reviewId}`);
  return res.data;
};

export const createReview = async (payload: ReviewCreatePayload): Promise<number> => {
  const res = await axiosInstance.post("/reviews", payload);
  return res.data?.reviewId;
};

export const updateReview = async (reviewId: number, payload: ReviewUpdatePayload): Promise<void> => {
  await axiosInstance.put(`/reviews/${reviewId}`, payload);
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  await axiosInstance.delete(`/reviews/${reviewId}`);
};

export const uploadReviewImages = async (files: File[]): Promise<string[]> => {
  if (!files.length) return [];

  const token = localStorage.getItem("accessToken");
  const uploads = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload/review", formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data?.url as string;
  });

  return Promise.all(uploads);
};
