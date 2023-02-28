import { createSlice } from '@reduxjs/toolkit';
import { NavigationSate } from '@store/index/index.props';

const initialState: NavigationSate = {
    isReady: false
};

export const NavigationStateReducer = createSlice({
    name: 'navigationState',
    initialState,
    reducers: {
        setIsReady: (state, action) => {
            state.isReady = action.payload;
        }
    }
});

export const { setIsReady } = NavigationStateReducer.actions;

export default NavigationStateReducer.reducer;
