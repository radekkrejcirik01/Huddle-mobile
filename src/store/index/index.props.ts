export interface ReducerProps {
    user: User;
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
}
