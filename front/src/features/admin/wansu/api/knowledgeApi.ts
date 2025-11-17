import axiosInstance from '../../../../api/axiosInstance';

// Spring Boot 백엔드가 보내주는 데이터 모양에 맞춘 TypeScript 타입 정의
export interface KnowledgeItem {
    knowledgeId: number;
    knowledgeIntent: string;
    knowledgeQuestion: string;
    knowledgeAnswer: string;
    knowledgeIsFaq: boolean;
    knowledgeIsActive: boolean;
    knowledgeCreatedAt: string; // 날짜/시간 타입은 우선 string으로 받습니다.
    knowledgeUpdatedAt: string;
}

// 1. 목록 조회 API 함수
export const getKnowledgeList = async (): Promise<KnowledgeItem[]> => {
    const response = await axiosInstance.get('/admin/chatbot/knowledge');
    return response.data;
};

// 2. 항목 추가 API 함수
export const createKnowledge = async (data: { knowledgeIntent: string; knowledgeQuestion: string; knowledgeAnswer: string }): Promise<KnowledgeItem> => {
    const response = await axiosInstance.post('/admin/chatbot/knowledge', data);
    return response.data;
};

// 3. 항목 수정 API 함수 (타입을 더 안전하게 수정했습니다)
export const updateKnowledge = async (
    id: number, 
    data: Partial<Pick<KnowledgeItem, 'knowledgeIntent' | 'knowledgeQuestion' | 'knowledgeAnswer' | 'knowledgeIsFaq' | 'knowledgeIsActive'>>
): Promise<KnowledgeItem> => {
    const response = await axiosInstance.put(`/admin/chatbot/knowledge/${id}`, data);
    return response.data;
};

// 4. 항목 삭제 API 함수
export const deleteKnowledge = async (id: number): Promise<KnowledgeItem> => {
    const response = await axiosInstance.delete(`/admin/chatbot/knowledge/${id}`);
    return response.data;
};