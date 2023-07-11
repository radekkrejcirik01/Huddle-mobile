import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import SelectUsersReducer from '@store/SelectUsersReducer';
import DeviceReducer from '@store/DeviceReducer';
import NavigationStateReducer from '@store/NavigationState';
import ConversationReducer from '@store/Conversation';
import TypingReducer from '@store/TypingReducer';
import UnreadMessagesReducer from '@store/UnreadMessagesReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        selectUsers: SelectUsersReducer,
        device: DeviceReducer,
        navigationState: NavigationStateReducer,
        conversation: ConversationReducer,
        typing: TypingReducer,
        unreadMessages: UnreadMessagesReducer
    }
});
