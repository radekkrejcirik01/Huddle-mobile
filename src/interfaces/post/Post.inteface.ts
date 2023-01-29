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

export interface GroupHangoutCreateInterface {
    user: string;
    name: string;
    title: string;
    usernames: Array<string>;
    time: string;
    place: string;
    picture: string;
}

export interface ConversationsCreateInterface {
    usernames: Array<string>;
}

export interface AcceptPeopleInvitationInterface {
    id: number;
    value: number;
    user: string;
    username: string;
    name: string;
}

export interface AcceptHangoutInvitationInterface {
    id: number;
    value: number;
    user: string;
    username: string;
    name: string;
}

export interface UpdateReadInterface {
    username: string;
    conversationId: number;
    messageId: number;
}

export interface DeviceInterface {
    username: string;
    deviceToken: string;
}

export interface UploadImageInterface {
    username?: string;
    key: string;
    buffer: string;
    isHangout?: boolean;
}
