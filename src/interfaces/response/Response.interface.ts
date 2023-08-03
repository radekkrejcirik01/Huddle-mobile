import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import {
    HuddleItemInterface,
    MessageItemProps
} from '@screens/account/ConversationScreen/ConversationScreen.props';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import {
    CommentItemInterface,
    CommentLikeInterface
} from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';
import { HiddenItemProps } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen.props';
import { MutedHuddlesItemProps } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.props';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface AuthResponseInterface {
    status: string;
    message: string;
    token: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        username: string;
        firstname: string;
        profilePhoto: string;
    };
}

export interface ResponseUserNotificationsGetInterface {
    status: string;
    message: string;
    data?: {
        friendsInvitesNotifications: number;
        newHuddlesNotifications: number;
        huddleLikesNotifications: number;
        commentsNotifications: number;
        mentionsNotifications: number;
        messagesNotifications: number;
    };
}

export interface ResponseFriendsGetInterface {
    status: string;
    message: string;
    data?: Array<FriendsItemProps>;
}

export interface ResponseShowPeopleGetInterface {
    status: string;
    message: string;
    data?: Array<HiddenItemProps>;
}

export interface ResponseMutedHuddlesGetInterface {
    status: string;
    message: string;
    data?: Array<MutedHuddlesItemProps>;
}

export interface ResponseIsConversationMutedGetInterface {
    status: string;
    message: string;
    muted: boolean;
    people: Array<string>;
}

export interface ResponseNumberInvitesGetInterface {
    status: string;
    message: string;
    number?: number;
}

export interface ResponseHuddleGetInterface {
    status: string;
    message: string;
    data?: HuddleItemInterface;
}

export interface ResponseHuddlesGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleItemInterface>;
}

export interface ResponseHuddlesCommentsGetInterface {
    status: string;
    message: string;
    data?: Array<CommentItemInterface>;
    mentions?: Array<Mention>;
}

export interface ResponseHuddleCommentLikesGetInterface {
    status: string;
    message: string;
    data?: Array<CommentLikeInterface>;
}

export interface ResponseChatsGetInterface {
    status: string;
    message: string;
    data?: Array<ChatsListDataProps>;
}

export interface ResponseConversationLikedInterface {
    status: string;
    message: string;
    isLiked?: number;
}

export interface MessagesResponseInterface {
    status: string;
    message: string;
    data?: Array<MessageItemProps>;
}

export interface MessagesByUsernamesResponseInterface {
    status: string;
    message: string;
    data?: Array<MessageItemProps>;
    conversationId?: number;
}

export interface ResponseUploadImageInterface {
    status: string;
    message: string;
    imageUrl: string;
}
