import { HuddleTypeEnum } from '@enums/huddles/HuddleType.enum';

export interface HuddleItemInterface {
    id: number;
    createdBy: string;
    profilePhoto: string;
    name: string;
    what: string;
    where: string;
    when: string;
    type: HuddleTypeEnum;
    interacted: number;
}
