export interface ChatsListDataProps {
    id: number;
    sender: string;
    name: string;
    profilePhoto?: string;
    lastMessage?: string;
    isNewMessage?: number;
    isSeen: number;
    isLiked?: number;
    newHuddles?: number;
    time: number;
}
