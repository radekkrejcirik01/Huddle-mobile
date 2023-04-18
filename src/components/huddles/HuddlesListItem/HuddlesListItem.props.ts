import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface HuddlesListItemProps {
    item: HuddleItemInterface;
    onPressCard: (item: HuddleItemInterface) => void;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onInteract: (item: HuddleItemInterface) => void;
}
