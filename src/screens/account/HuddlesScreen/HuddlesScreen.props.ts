export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto: string;
    name: string;
    what: string;
    color: number;
    commentsNumber?: number;
    interacted?: number;
}
