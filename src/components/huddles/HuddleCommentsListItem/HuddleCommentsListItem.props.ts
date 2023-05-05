export interface HuddleCommentsListItemProps {
    item: CommentItemInterface;
    onPressProfilePhoto: () => void;
    onPressName: () => void;
    onPressMention: () => void;
    likeValue: number;
    onPressLike: (value: boolean) => void;
}

export interface CommentItemInterface {
    id: number;
    sender: string;
    name: string;
    profilePhoto?: string;
    message: string;
    mention?: {
        name: string;
        profilePhoto?: string;
    };
    likesNumber?: number;
    liked?: number;
    time: string;
}
