export interface HuddleCommentsListItemProps {
    item: CommentItemInterface;
    onPressProfilePhoto: () => void;
    onPressName: () => void;
    onPressLike: () => void;
}

export interface CommentItemInterface {
    id: number;
    sender: string;
    name: string;
    profilePhoto: string;
    message: string;
    mention?: string;
    time: string;
}
