import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    user: {
        firstname: null,
        username: null,
        profilePhoto: null
    },
    people: null,
    huddles: null,
    notifications: null,
    unreadMessages: null
};

export const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setFirstnameAction: (state, action) => {
            state.user.firstname = action.payload;
        },
        setUsernameAction: (state, action) => {
            state.user.username = action.payload;
        },
        setProfilePhotoAction: (state, action) => {
            state.user.profilePhoto = action.payload;
        },
        setPeopleAction: (state, action) => {
            state.people = action.payload;
        },
        setHuddlesAction: (state, action) => {
            state.huddles = action.payload;
        },
        setUnreadMessagesAction: (state, action) => {
            state.unreadMessages = action.payload;
        },
        setUserStateAction: (state, action) => {
            action.payload.token = action.payload.user.username;
            return action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setFirstnameAction,
    setUsernameAction,
    setProfilePhotoAction,
    setPeopleAction,
    setHuddlesAction,
    setUnreadMessagesAction,
    setUserStateAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
