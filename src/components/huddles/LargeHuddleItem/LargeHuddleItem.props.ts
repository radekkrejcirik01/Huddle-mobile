import { StyleProp, ViewStyle } from 'react-native';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface LargeHuddleItemProps {
    item: HuddleItemInterface;
    onCardPress?: () => void;
    onProfilePress: () => void;
    onLikePress?: () => void;
    onCardLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const LargeHuddlesListItemDefaultProps: Omit<
    LargeHuddleItemProps,
    'item' | 'onProfilePress'
> = {
    onCardPress: null,
    onLikePress: null,
    onCardLongPress: null,
    style: {}
};
