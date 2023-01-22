export interface ReducerProps {
    user: User;
    choosePeople: ChoosePeople;
    device: Device;
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

export interface Device {
    token: string;
}
