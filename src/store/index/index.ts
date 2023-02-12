import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import ChoosePeopleReducer from '@store/ChoosePeopleReducer';
import DeviceReducer from '@store/DeviceReducer';
import NavigationStateReducer from '@store/NavigationState';
import ConversationReducer from '@store/Conversation';
import TypingReducer from '@store/TypingReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        choosePeople: ChoosePeopleReducer,
        device: DeviceReducer,
        navigationState: NavigationStateReducer,
        conversation: ConversationReducer,
        typing: TypingReducer
    }
});
