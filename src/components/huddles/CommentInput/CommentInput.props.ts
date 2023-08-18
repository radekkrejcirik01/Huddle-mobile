export interface CommentInputProps {
    huddleId: number;
    onSend: () => void;
    mention: Mention;
    mentions: Array<Mention>;
}

export interface Mention {
    id?: number;
    username: string;
    name: string;
    profilePhoto: string;
}
