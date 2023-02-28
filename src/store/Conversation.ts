import { createSlice } from '@reduxjs/toolkit';
import { Conversation } from '@store/index/index.props';

const initialState: Conversation = {
    conversationId: null,
    loadConversation: false,
    loadRead: false
};

export const ConversationReducer = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversationId: (state, action) => {
            state.conversationId = action.payload;
        },
        setLoadConversation: (state, action) => {
            state.loadConversation = action.payload;
        },
        setLoadRead: (state, action) => {
            state.loadRead = action.payload;
        }
    }
});

export const { setLoadRead, setConversationId, setLoadConversation } =
    ConversationReducer.actions;

export default ConversationReducer.reducer;
