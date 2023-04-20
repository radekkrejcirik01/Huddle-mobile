import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface HuddleModalScreenProps {
    huddle: HuddleItemInterface;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onInteract: (item: HuddleItemInterface) => void;
}

export interface HuddleInteractionInterface {
    id: number;
    username: string;
    name: string;
    profilePhoto: string;
}

export interface HuddleInteractionRefInterface {
    loadInteractions: () => void;
}
