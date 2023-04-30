import { StyleProp, ViewStyle } from 'react-native';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export interface LargeHuddleListItemProps {
    item: HuddleItemInterface;
    created: boolean;
    onPressCard?: (item: HuddleItemInterface) => void;
    onPressProfilePhoto: (item: HuddleItemInterface) => void;
    onPressInteract?: (item: HuddleItemInterface) => void;
    style?: StyleProp<ViewStyle>;
}

export const LargeHuddlesListItemDefaultProps: Omit<
    LargeHuddleListItemProps,
    'item' | 'created' | 'onPressProfilePhoto'
> = {
    onPressCard: null,
    onPressInteract: null,
    style: {}
};
