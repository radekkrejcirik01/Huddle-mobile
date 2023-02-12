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
            if (state.isTyping?.length === 0) {
                state.isTyping = [action.payload];
                return;
            }
            if (!state.isTyping.includes(action.payload)) {
                state.isTyping = [action.payload, state.isTyping];
            }
        },
        setIsNotTyping: (state, action) => {
            const array = state.isTyping.filter(
                (value: string) => value !== action.payload
            );
            state.isTyping = array;
        }
    }
});

export const { setIsTyping, setIsNotTyping } = TypingReducer.actions;

export default TypingReducer.reducer;
