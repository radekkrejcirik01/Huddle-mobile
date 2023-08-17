import { CommentLikeInterface } from '@components/huddles/CommentItem/CommentItem.props';
import { HuddleLike } from '@components/huddles/HuddleLikesModal/HuddleLikesModal.props';

export interface LikeItemProps {
    item: CommentLikeInterface | HuddleLike;
    onPress: () => void;
}
