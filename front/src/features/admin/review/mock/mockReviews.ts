import type { AdminReview } from '../types/adminReview';

export const mockReviews: AdminReview[] = [
  {
    reviewId:    'asdf123',
    author:      '굿또오',
    targetUser:  '닉넴모하지',
    title:       '엑소 점퍼 교환 구함',
    content:     '엑소 점퍼 잘 받았어요!...',
    photos:     ['https://cdn.class101.net/images/66ee24e2-70af-4666-8143-0d9b0d2279f3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEWrbOPQIgwphOdb0WWhsyeZu6SnaEmO0xA&s'],
    reportCount: 10,
    rating:      4,
    status:      'NORMAL',
    createdAt:   '2025.01.05 13:11',
  },
  {
    reviewId:    'zxc456',
    author:      '러버굿',
    targetUser:  '어쩔저쩔',
    title:       '교환',
    content:     '진짜 어이없네요. 예의도 없고..',
    reportCount: 0,
    rating:      1,
    status:      'BLIND',
    createdAt:   '2025.01.04 14:22',
  },
];
