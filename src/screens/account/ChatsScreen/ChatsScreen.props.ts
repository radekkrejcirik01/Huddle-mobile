export interface ChatsListDataProps {
    id: number;
    sender: string;
    name: string;
    profilePhoto?: string;
    lastMessage?: string;
    isNewMessage?: number;
    isRead?: number;
    isLiked?: number;
    newHuddles?: number;
    time: number;
}
