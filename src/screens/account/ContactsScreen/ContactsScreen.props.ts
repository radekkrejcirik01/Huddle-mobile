interface Person {
    id: number;
    name: string;
    username: string;
    profilePhoto: string;
}

export interface FriendsItemProps {
    id: number;
    user: Person;
    accepted: number;
}
