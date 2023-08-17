export interface HuddleLikesModalProps {
    id: number;
    hideModal: () => void;
}

export interface HuddleLike {
    id: number;
    name: string;
    profilePhoto: string;
}
