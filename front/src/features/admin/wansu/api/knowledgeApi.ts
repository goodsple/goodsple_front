import axiosInstance from '../../../../api/axiosInstance';

export interface KnowledgeItem {
    knowledgeId: number;
    knowledgeIntent: string;
    knowledgeQuestion: string;
    knowledgeAnswer: string;
    knowledgeIsFaq: boolean;
    knowledgeIsActive: boolean;
    knowledgeCreatedAt: string; 
    knowledgeUpdatedAt: string;
}

export const getKnowledgeList = async (): Promise<KnowledgeItem[]> => {
    const response = await axiosInstance.get('/admin/chatbot/knowledge');
    return response.data;
};

export const createKnowledge = async (data: { knowledgeIntent: string; knowledgeQuestion: string; knowledgeAnswer: string }): Promise<KnowledgeItem> => {
    const response = await axiosInstance.post('/admin/chatbot/knowledge', data);
    return response.data;
};

export const updateKnowledge = async (
    id: number, 
    data: Partial<Pick<KnowledgeItem, 'knowledgeIntent' | 'knowledgeQuestion' | 'knowledgeAnswer' | 'knowledgeIsFaq' | 'knowledgeIsActive'>>
): Promise<KnowledgeItem> => {
    const response = await axiosInstance.put(`/admin/chatbot/knowledge/${id}`, data);
    return response.data;
};

export const deleteKnowledge = async (id: number): Promise<KnowledgeItem> => {
    const response = await axiosInstance.delete(`/admin/chatbot/knowledge/${id}`);
    return response.data;
};