import { CommentLikeInterface } from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';

export interface CommentLikesListItemProps {
    item: CommentLikeInterface;
    onPress: () => void;
}
