export type Room = {
    id: string;
    nick: string;
    avatar?: string;
    verified?: boolean;
    last: string;
    unread: number;
    updatedAt: string; // ISO

     // 최초 진입 화면용(옵셔널)
    postPreview?: { title: string; thumb?: string; tags?: string[] };
    levelText?: string; 
};
  
  export type Msg = {
    id: string;
    senderId: number;
    text: string;
    at: string; // ISO
    status?: 'sent' | 'read';
};