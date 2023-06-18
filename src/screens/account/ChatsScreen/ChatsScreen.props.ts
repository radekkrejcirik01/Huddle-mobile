export interface ChatsListDataProps {
    id: number;
    name: string;
    profilePhoto?: string;
    lastMessage?: string;
    isRead?: number;
    isLiked?: number;
    time: number;
}
