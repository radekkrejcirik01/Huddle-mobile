export interface ParticipantsListProps {
    usernames: Array<Participant>;
    onPressUser: (value: Participant) => void;
}

export interface Participant {
    username: string;
    firstname: string;
    profilePhoto: string;
    confirmed?: number;
}
