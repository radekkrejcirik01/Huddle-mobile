import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface HuddleModalScreenProps {
    huddle: HuddleItemInterface;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onPressInteract: (item: HuddleItemInterface) => void;
    onConfirm?: () => void;
}

export const HuddleModalScreenDefaultProps: Omit<
    HuddleModalScreenProps,
    'huddle' | 'onPressProfilePhoto' | 'onPressInteract'
> = {
    onConfirm: null
};

export interface HuddleInteractionInterface {
    id?: number;
    username: string;
    name: string;
    profilePhoto: string;
}
