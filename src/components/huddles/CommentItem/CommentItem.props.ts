export interface CommentItemProps {
    item: CommentItemInterface;
    onPressProfilePhoto: () => void;
    onPressName: () => void;
    onPressMention: () => void;
    onItemLongPress: () => void;
    liked: number;
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
    time: number;
}

export interface CommentLikeInterface {
    id: number;
    name: string;
    profilePhoto: string;
}
