export interface ReducerProps {
    getStarted: GetStarted;
    user: User;
    selectUsers: SelectUsers;
    device: Device;
    navigationState: NavigationSate;
    conversation: Conversation;
    typing: Typing;
    unreadMessages: UnreadMessages;
}

export interface GetStarted {
    getStarted: boolean;
}

export interface User {
    token: string;
    user: {
        firstname: string;
        username: string;
        profilePhoto: string;
    };
}

export interface SelectUsers {
    selectedUsernames: Array<string>;
    selectedUsers: Array<{
        username: string;
        firstname: string;
        profilePhoto: string;
    }>;
}

export interface Device {
    token: string;
}

export interface NavigationSate {
    isReady: boolean;
}

export interface Conversation {
    conversationId: number;
    loadConversation: boolean;
    loadRead: boolean;
}

export interface Typing {
    isTyping: Array<{
        conversationId: number;
        username: string;
        value: number;
    }>;
}

export interface UnreadMessages {
    unread: number;
}
