import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    user: {
        firstname: null,
        username: null,
        profilePhoto: null
    }
};

export const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserStateAction: (state, action) => ({
            token: action.payload.username,
            user: action.payload
        }),
        setProfilePhotoAction: (state, action) => {
            state.user.profilePhoto = action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setProfilePhotoAction,
    setUserStateAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
