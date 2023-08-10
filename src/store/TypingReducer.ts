import { createSlice } from '@reduxjs/toolkit';
import { Typing } from '@store/index/index.props';

const initialState: Typing = {
    typing: []
};

export const TypingReducer = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        setTyping: (state, action) => {
            for (let i = 0; i < state.typing.length; i += 1) {
                if (
                    state.typing[i].conversationId ===
                        action.payload.conversationId &&
                    state.typing[i].username === action.payload.username
                ) {
                    state.typing[i].isTyping = action.payload.isTyping;
                    return;
                }
            }
            state.typing = [...state.typing, action.payload];
        }
    }
});

export const { setTyping } = TypingReducer.actions;

export default TypingReducer.reducer;
