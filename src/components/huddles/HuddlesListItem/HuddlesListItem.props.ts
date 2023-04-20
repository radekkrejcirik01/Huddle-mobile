import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { StyleProp, ViewStyle } from 'react-native';

export interface HuddlesListItemProps {
    item: HuddleItemInterface;
    onPressCard?: (item: HuddleItemInterface) => void;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onInteract: (item: HuddleItemInterface) => void;
    style?: StyleProp<ViewStyle>;
}

export const HuddlesListItemDefaultProps: Omit<
    HuddlesListItemProps,
    'item' | 'onPressProfilePhoto' | 'onInteract'
> = {
    onPressCard: null,
    style: {}
};
