export interface ReducerProps {
    user: User;
    selectUsers: SelectUsers;
    device: Device;
    navigationState: NavigationSate;
    conversation: Conversation;
    typing: Typing;
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
    typing: Array<{
        conversationId: number;
        username: string;
        isTyping: number;
    }>;
}
