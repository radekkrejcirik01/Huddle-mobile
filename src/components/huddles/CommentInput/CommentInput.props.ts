export interface CommentInputProps {
    huddleId: number;
    onSend: () => void;
    mention: Mention;
    mentions: Array<Mention>;
}

export interface Mention {
    username: string;
    name: string;
    profilePhoto: string;
}
