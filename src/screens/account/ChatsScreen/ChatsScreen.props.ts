export interface ChatsListDataProps {
    id: number;
    usernames: Array<{
        username: string;
        firstname: string;
        profilePhoto: string;
    }>;
    name: string;
    picture: string;
    message: string;
    time: string;
    isRead: number;
    type: string;
}
