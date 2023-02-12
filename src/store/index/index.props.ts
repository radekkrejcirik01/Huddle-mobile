export interface ReducerProps {
    user: User;
    choosePeople: ChoosePeople;
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
        profilePicture: string;
    };
    people: number;
    hangouts: number;
    notifications: number;
    unreadMessages: number;
}

export interface ChoosePeople {
    users: Array<string>;
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
    isTyping: Array<string>;
}
