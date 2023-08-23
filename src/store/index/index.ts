import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import DeviceReducer from '@store/DeviceReducer';
import NavigationStateReducer from '@store/NavigationState';
import ConversationReducer from '@store/Conversation';
import TypingReducer from '@store/TypingReducer';
import Invites from '@store/Invites';

export default configureStore({
    reducer: {
        user: UserReducer,
        device: DeviceReducer,
        navigationState: NavigationStateReducer,
        conversation: ConversationReducer,
        invites: Invites,
        typing: TypingReducer
    }
});
