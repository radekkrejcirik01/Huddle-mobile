import { configureStore } from '@reduxjs/toolkit';
import GetStartedReducer from '@store/GetStartedReducer';
import UserReducer from '@store/UserReducer';
import SelectUsersReducer from '@store/SelectUsersReducer';
import DeviceReducer from '@store/DeviceReducer';
import NavigationStateReducer from '@store/NavigationState';
import ConversationReducer from '@store/Conversation';
import TypingReducer from '@store/TypingReducer';

export default configureStore({
    reducer: {
        getStarted: GetStartedReducer,
        user: UserReducer,
        selectUsers: SelectUsersReducer,
        device: DeviceReducer,
        navigationState: NavigationStateReducer,
        conversation: ConversationReducer,
        typing: TypingReducer
    }
});
