import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    firstname: null,
    username: null
};

export const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setFirstnameAction: (state, action) => {
            state.firstname = action.payload;
        },
        setUsernameAction: (state, action) => {
            state.username = action.payload;
        },
        setUserStateAction: (state, action) => {
            action.payload.token = action.payload.username;
            return action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setFirstnameAction,
    setUsernameAction,
    setUserStateAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
