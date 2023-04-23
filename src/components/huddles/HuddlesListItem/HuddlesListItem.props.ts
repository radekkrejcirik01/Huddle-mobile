import { StyleProp, ViewStyle } from 'react-native';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface HuddlesListItemProps {
    item: HuddleItemInterface;
    onPressCard?: (item: HuddleItemInterface) => void;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onPressInteract: (item: HuddleItemInterface) => void;
    style?: StyleProp<ViewStyle>;
}

export const HuddlesListItemDefaultProps: Omit<
    HuddlesListItemProps,
    'item' | 'onPressProfilePhoto' | 'onPressInteract'
> = {
    onPressCard: null,
    style: {}
};
