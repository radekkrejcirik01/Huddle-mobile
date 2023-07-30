import { HuddleItemInterface } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface SmallHuddleListItemProps {
    item: HuddleItemInterface;
    onPressCard: (item: HuddleItemInterface) => void;
}
