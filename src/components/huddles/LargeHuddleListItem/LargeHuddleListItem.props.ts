import { StyleProp, ViewStyle } from 'react-native';
import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface LargeHuddleListItemProps {
    item: HuddleItemInterface;
    onPressCard?: () => void;
    onPressProfilePhoto: () => void;
    onPressInteract?: () => void;
    onItemLongPress?: () => void;
    onMorePress?: () => void;
    hideCommentsNumber?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const LargeHuddlesListItemDefaultProps: Omit<
    LargeHuddleListItemProps,
    'item' | 'onPressProfilePhoto'
> = {
    onPressCard: null,
    onPressInteract: null,
    onItemLongPress: null,
    onMorePress: null,
    hideCommentsNumber: false,
    style: {}
};
