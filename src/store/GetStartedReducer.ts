import { createSlice } from '@reduxjs/toolkit';
import { GetStarted } from '@store/index/index.props';

const initialState: GetStarted = {
    getStarted: null
};

export const GetStartedReducer = createSlice({
    name: 'getStarted',
    initialState,
    reducers: {
        setGetStarted: (state, action) => {
            state.getStarted = action.payload;
        }
    }
});

export const { setGetStarted } = GetStartedReducer.actions;

export default GetStartedReducer.reducer;
