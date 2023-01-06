import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    firstname: null,
    email: null
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
        setEmailAction: (state, action) => {
            state.email = action.payload;
        },
        setUserStateAction: (state, action) => {
            action.payload.token = action.payload.email;
            return action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setFirstnameAction,
    setEmailAction,
    setUserStateAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
