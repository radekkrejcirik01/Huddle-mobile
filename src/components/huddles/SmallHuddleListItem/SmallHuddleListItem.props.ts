import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface SmallHuddleListItemProps {
    item: HuddleItemInterface;
    onPressCard: (item: HuddleItemInterface) => void;
}
