export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto: string;
    name: string;
    what: string;
    commentsNumber?: number;
    interacted?: number;
}
