import { createSlice } from '@reduxjs/toolkit';
import { UnreadMessages } from '@store/index/index.props';

const initialState: UnreadMessages = {
    unread: 0
};

export const UnreadMessagesReducer = createSlice({
    name: 'unreadMessages',
    initialState,
    reducers: {
        setUnreadMessagesAction: (state, action) => {
            state.unread = action.payload;
        }
    }
});

export const { setUnreadMessagesAction } = UnreadMessagesReducer.actions;

export default UnreadMessagesReducer.reducer;
