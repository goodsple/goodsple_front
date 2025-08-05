export interface ProhibitedWord {
    id: number;
    date: string;
    status: '활성화' | '비활성화';
    word: string;
}

export const mockProhibitedWords: ProhibitedWord[] = [
    { id: 1, date: '2025-07-04', status: '활성화', word: '미친놈' },
    { id: 2, date: '2025-07-04', status: '비활성화', word: '개빡치네' },
    { id: 3, date: '2025-07-04', status: '활성화', word: '바보자식' },
    { id: 4, date: '2025-07-04', status: '비활성화', word: '멍청이' },
    { id: 5, date: '2025-07-04', status: '활성화', word: '돌아이' },
    { id: 6, date: '2025-07-04', status: '비활성화', word: '쓰레기' },
    { id: 7, date: '2025-07-04', status: '활성화', word: '재수없어' },
    { id: 8, date: '2025-07-04', status: '비활성화', word: '시끄러워' },
    { id: 9, date: '2025-07-04', status: '활성화', word: '짜증나' },
    { id: 10, date: '2025-07-04', status: '비활성화', word: '꺼져' },
    { id: 5, date: '2025-07-04', status: '활성화', word: '돌아이' },
    { id: 6, date: '2025-07-04', status: '비활성화', word: '쓰레기' },
    { id: 7, date: '2025-07-04', status: '활성화', word: '재수없어' },
    { id: 8, date: '2025-07-04', status: '비활성화', word: '시끄러워' },
    { id: 9, date: '2025-07-04', status: '활성화', word: '짜증나' },
    { id: 10, date: '2025-07-04', status: '비활성화', word: '꺼져' },
];
