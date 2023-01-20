export interface ReducerProps {
    user: User;
    choosePeople: ChoosePeople;
}

export interface User {
    token: string;
    user: {
        firstname: string;
        username: string;
        profilePicture: string;
    };
    people: number;
    hangouts: number;
    notifications: number;
    unreadMessages: number;
}

export interface ChoosePeople {
    users: Array<string>;
}
