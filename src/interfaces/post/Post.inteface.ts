export interface UserPostInterface {
    username: string;
    firstname: string;
}

export interface UserGetPostInterface {
    username: string;
}

export interface AddPersonInvitePostInterface {
    sender: string;
    receiver: string;
}

export interface AddHuddlePostInterface {
    sender: string;
    what: string;
    where: string;
    when: string;
    people: Array<string>;
}

export interface HuddleInteractPostInterface {
    huddleId: number;
    sender: string;
    receiver: string;
}

export interface HuddleConfirmPostInterface {
    huddleId: number;
    sender: string;
    receiver: string;
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

export interface NotifyInterface {
    sender: string;
    senderName: string;
    receiver: string;
}

export interface ConversationCreateInterface {
    usernames: Array<string>;
    username: string;
}

export interface GetConversationDetailsInterface {
    conversationId: number;
    username: string;
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

export interface AcceptPersonInviteInterface {
    sender: string;
    receiver: string;
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
