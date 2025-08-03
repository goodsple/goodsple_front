export interface SearchCriteria {
    keyword: string;
    statuses: ('NORMAL'|'BLIND')[];
    fromDate: string;
    toDate: string;
}

export interface AdminReview {
    reviewId:     string;
    author:       string;
    targetUser:   string;
    title:        string;
    content:      string;
    photos?:      string[]; 
    reportCount:  number;
    rating:       number;   // 1~5
    status:       'NORMAL' | 'BLIND';
    createdAt:    string;   // e.g. "2025.01.05 13:11"
}