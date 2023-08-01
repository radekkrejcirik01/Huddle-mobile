import { StyleProp, ViewStyle } from 'react-native';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface LargeHuddleListItemProps {
    item: HuddleItemInterface;
    onCardPress?: () => void;
    onProfilePress: () => void;
    onLikePress?: () => void;
    onCardLongPress?: () => void;
    onMorePress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const LargeHuddlesListItemDefaultProps: Omit<
    LargeHuddleListItemProps,
    'item' | 'onProfilePress'
> = {
    onCardPress: null,
    onLikePress: null,
    onCardLongPress: null,
    onMorePress: null,
    style: {}
};
