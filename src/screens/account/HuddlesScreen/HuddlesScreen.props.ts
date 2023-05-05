export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto: string;
    name: string;
    what: string;
    where: string;
    when: string;
    commentsNumber?: number;
    interacted?: number;
    confirmed?: number;
    canceled?: number;
}
