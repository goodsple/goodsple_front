// src/features/admin/wansu/api/knowledgeApi.ts

import axiosInstance from '../../../../api/axiosInstance';

// TypeScript 타입을 정의하여 안정성을 높입니다.
export interface KnowledgeItem {
    knowledgeId: number;
    knowledgeIntent: string;
    knowledgeQuestion: string;
    knowledgeAnswer: string;
    knowledgeIsFaq: boolean;
    knowledgeIsActive: boolean;
    knowledgeCreatedAt: string; // 날짜는 우선 string으로 받습니다.
    knowledgeUpdatedAt: string;
}

// 1. 목록 조회 API
export const getKnowledgeList = async (): Promise<KnowledgeItem[]> => {
    const response = await axiosInstance.get('/admin/chatbot/knowledge');
    return response.data;
};

// 2. 항목 추가 API
export const createKnowledge = async (data: { knowledgeIntent: string; knowledgeQuestion: string; knowledgeAnswer: string }): Promise<KnowledgeItem> => {
    const response = await axiosInstance.post('/admin/chatbot/knowledge', data);
    return response.data;
};

// 3. 항목 수정 API
export const updateKnowledge = async (id: number, data: Partial<KnowledgeItem>): Promise<KnowledgeItem> => {
    const response = await axiosInstance.put(`/admin/chatbot/knowledge/${id}`, data);
    return response.data;
};

// 4. 항목 삭제 API
export const deleteKnowledge = async (id: number): Promise<KnowledgeItem> => {
    const response = await axiosInstance.delete(`/admin/chatbot/knowledge/${id}`);
    return response.data;
};