import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    user: {
        firstname: null,
        username: null,
        profilePhoto: null
    },
    peopleNumber: null,
    notificationsNumber: null,
    unreadMessagesNumber: null
};

export const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserStateAction: (state, action) => {
            action.payload.token = action.payload.user.username;
            return action.payload;
        },
        setProfilePhotoAction: (state, action) => {
            state.user.profilePhoto = action.payload;
        },
        setNotificationsNumberAction: (state, action) => {
            state.notificationsNumber = action.payload;
        },
        setPeopleNumberAction: (state, action) => {
            state.peopleNumber = action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setProfilePhotoAction,
    setUserStateAction,
    setNotificationsNumberAction,
    setPeopleNumberAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
