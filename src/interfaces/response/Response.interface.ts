import { NotificationsListProps } from '@screens/account/NotificationsScreen/NotificationsScreen.props';
import { ChatsListDataProps } from '@screens/account/ChatsScreen/ChatsScreen.props';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';
import { PeopleItemProps } from '@screens/account/PeopleScreen/PeopleScreen.props';
import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';
import {
    CommentItemInterface,
    CommentLikeInterface
} from '@components/huddles/HuddleCommentsListItem/HuddleCommentsListItem.props';
import { Mention } from '@components/huddles/CommentInput/CommentInput.props';
import { MessageItemProps } from '@screens/account/ConversationScreen/ConversationScreen.props';

export interface ResponseInterface {
    status: string;
    message: string;
}

export interface ResponseUserGetInterface {
    status: string;
    message: string;
    data?: {
        user: {
            id: number;
            username: string;
            firstname: string;
            profilePhoto: string;
        };
        people: number;
        huddles: number;
        notifications: number;
        unreadMessages: number;
    };
}

export interface ResponsePeopleNumberGetInterface {
    status: string;
    message: string;
    peopleNumber?: number;
}

export interface ResponsePeopleGetInterface {
    status: string;
    message: string;
    data?: Array<PeopleItemProps>;
}

export interface ResponseHuddlesGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleItemInterface>;
}

export interface ResponseHuddleGetInterface {
    status: string;
    message: string;
    data?: HuddleItemInterface;
}

export interface ResponseHuddlesInteractionsGetInterface {
    status: string;
    message: string;
    data?: Array<HuddleInteractionInterface>;
    confirmedUser?: HuddleInteractionInterface;
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

export interface ResponseNotificationsGetInterface {
    status: string;
    message: string;
    data?: Array<NotificationsListProps>;
}

export interface ConversationDetailsInterface {
    id: number;
    name: string;
    picture: string;
    users: Array<{
        username: string;
        firstname: string;
        profilePhoto: string;
    }>;
    createdBy: string;
    type: string;
}

export interface ResponseGetConversationDetailsInterface {
    status: string;
    message: string;
    data?: ConversationDetailsInterface;
}

export interface ResponseUploadImageInterface {
    status: string;
    message: string;
    imageUrl: string;
}
