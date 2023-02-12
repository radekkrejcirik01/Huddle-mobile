import { createSlice } from '@reduxjs/toolkit';
import { Typing } from '@store/index/index.props';

const initialState: Typing = {
    isTyping: []
};

export const TypingReducer = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        setIsTyping: (state, action) => {
            for (let i = 0; i < state.isTyping.length; i += 1) {
                if (
                    state.isTyping[i].conversationId ===
                        action.payload.conversationId &&
                    state.isTyping[i].username === action.payload.username
                ) {
                    state.isTyping[i].value = action.payload.value;
                    return;
                }
            }
            state.isTyping = [...state.isTyping, action.payload];
        }
    }
});

export const { setIsTyping } = TypingReducer.actions;

export default TypingReducer.reducer;
