export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto: string;
    name: string;
    what: string;
    where: string;
    when: string;
    interacted?: number;
    confirmed?: number;
    canceled?: number;
}
