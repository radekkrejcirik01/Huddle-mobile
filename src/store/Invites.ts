import { createSlice } from '@reduxjs/toolkit';
import { Invites } from '@store/index/index.props';

const initialState: Invites = {
    unseenInvites: 0
};

export const InvitesReducer = createSlice({
    name: 'invites',
    initialState,
    reducers: {
        setUnseenInvites: (state, action) => {
            state.unseenInvites = action.payload;
        }
    }
});

export const { setUnseenInvites } = InvitesReducer.actions;

export default InvitesReducer.reducer;
