import { Moment } from 'moment';

export interface UserPostInterface {
    username: string;
    firstname: string;
}

export interface UserGetPostInterface {
    username: string;
}

export interface FriendCreateInvitationPostInterface {
    user: string;
    username: string;
}

export interface MessagesGetInterface {
    conversationId: number;
}

export interface SendMessageInterface {
    sender: string;
    name: string;
    conversationId: number;
    message: string;
    buffer?: string;
    fileName?: string;
}

export interface SendTypingInterface {
    conversationId: number;
    username: string;
    value: number;
}

export interface HangoutCreateInterface {
    user: string;
    name: string;
    username: string;
    time: Moment;
    place: string;
}

export interface HangoutsGetInterface {
    username: string;
}

export interface HangoutGetInterface {
    id: number;
    username: string;
}

export interface HangoutUpdateInterface {
    id: number;
    buffer?: string;
    fileName?: string;
    title?: string;
    time?: Moment;
    plan?: string;
}

export interface RemoveHangoutUserInterface {
    id: number;
    username: string;
}

export interface HangoutDeleteInterface {
    id: number;
}

export interface GroupHangoutCreateInterface {
    user: string;
    name: string;
    title: string;
    usernames: Array<string>;
    time: Moment;
    place: string;
    buffer: string;
    fileName: string;
}

export interface GetHangoutUsernamesInterface {
    hangoutId: number;
}

export interface SendHangoutInvitation {
    hangoutId: number;
    user: string;
    name: string;
    usernames: Array<string>;
}

export interface ConversationCreateInterface {
    usernames: Array<string>;
    username: string;
}

export interface GetConversationDetailsInterface {
    conversationId: number;
    username: string;
}

export interface GetConversationUsersInterface {
    conversationId: number;
}

export interface AddConversationUsersInterface {
    conversationId: number;
    usernames: Array<string>;
}

export interface ConversationRemoveInterface {
    conversationId: number;
    username: string;
}

export interface ConversationUserRemoveInterface {
    conversationId: number;
    username: string;
}

export interface ConversationDeleteInterface {
    conversationId: number;
}

export interface AcceptFriendInvitationInterface {
    id: number;
    value: number;
    user: string;
    username: string;
    name: string;
}

export interface CheckFriendInvitationInterface {
    user: string;
    username: string;
}

export interface RemoveFriendInterface {
    user: string;
    username: string;
}

export interface AcceptHangoutInvitationInterface {
    id: number;
    value: number;
    user: string;
    username: string;
    name: string;
    type: string;
}

export interface UpdateReadInterface {
    username: string;
    conversationId: number;
    messageId: number;
}

export interface MessageReactInterface {
    username: string;
    conversationId: number;
    messageId: number;
    reaction: string;
}

export interface DeviceInterface {
    username: string;
    deviceToken: string;
}

export interface UploadProfileImageInterface {
    username: string;
    buffer: string;
    fileName: string;
}

export interface ConversationUpdateInterface {
    id: number;
    buffer: string;
    fileName: string;
    name: string;
}
