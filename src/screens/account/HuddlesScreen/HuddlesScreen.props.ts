export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto?: string;
    name: string;
    topic: string;
    color: number;
    commentsNumber?: number;
    interacted?: number;
}
