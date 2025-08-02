import type { AdminUser } from '../types/searchUser';

export const mockUsers: AdminUser[] = [
  {
    userId:            'asde123',
    nickname:          '굿또오',
    email:             'goodsple@gmail.com',
    reviewCount:       10,
    transactionCount:  10,
    reportCount:       0,
    level:             { label: 'Lv.2', score: 60 },
    role:              'USER',
    status:            'ACTIVE',
    joinDate:          '2025.01.01 20:30',
  },
  {
    userId:            'qwefb',
    nickname:          '예이이',
    email:             'goodsple@gmail.com',
    reviewCount:        2,
    transactionCount:   3,
    reportCount:        1,
    level:              { label: 'Lv.1', score: 10 },
    role:               'ADMIN',
    status:             'WITHDRAWN',
    joinDate:          '2025.01.01 17:20',
  },
];
