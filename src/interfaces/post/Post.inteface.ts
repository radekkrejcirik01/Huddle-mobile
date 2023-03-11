export interface UserPostInterface {
    username: string;
    firstname: string;
}

export interface UserGetPostInterface {
    username: string;
}

export interface PeopleCreateInvitationPostInterface {
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
    time: string;
    place: string;
}

export interface HangoutsGetInterface {
    username: string;
    showAll: boolean;
}

export interface HangoutGetInterface {
    id: number;
    username: string;
}

export interface HangoutUpdateInterface {
    id: number;
    buffer: string;
    fileName: string;
    title: string;
    time: string;
    plan: string;
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
    time: string;
    place: string;
    buffer: string;
    fileName: string;
}

export interface SendHangoutInvitation {
    hangoutId: number;
    user: string;
    name: string;
    usernames: Array<string>;
}

export interface ConversationsCreateInterface {
    usernames: Array<string>;
    username: string;
}

export interface GetConversationsDetailsInterface {
    conversationId: number;
    username: string;
}

export interface ConversationDeleteInterface {
    conversationId: number;
    username: string;
}

export interface AcceptPeopleInvitationInterface {
    id: number;
    value: number;
    user: string;
    username: string;
    name: string;
}

export interface CheckPeopleInvitationInterface {
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
