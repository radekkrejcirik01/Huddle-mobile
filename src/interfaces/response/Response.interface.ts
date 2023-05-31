import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { FriendsItemProps } from '@screens/account/FriendsScreen/FriendsScreen.props';
import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';
import {
    CommentItemInterface,
    CommentLikeInterface
} from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';
import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';
import { InviteItemProps } from '@screens/account/InvitesScreen/InvitesScreen.props';
import { HiddenItemProps } from '@screens/account/ShowHuddlesScreen/ShowHuddlesScreen.props';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        id: number;
        username: string;
        firstname: string;
        profilePhoto: string;
    };
}

export interface ResponseFriendsGetInterface {
    status: string;
    message: string;
    data?: Array<FriendsItemProps>;
    invitesNumber?: number;
}

export interface ResponseShowPeopleGetInterface {
    status: string;
    message: string;
    data?: Array<HiddenItemProps>;
}

export interface ResponseIsConversationMutedGetInterface {
    status: string;
    message: string;
    muted: boolean;
}

export interface ResponseInvitesGetInterface {
    status: string;
    message: string;
    data?: Array<InviteItemProps>;
}

export interface ResponseHuddlesGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleItemInterface>;
}

export interface ResponseHuddlesInteractionsGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleInteractionInterface>;
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
