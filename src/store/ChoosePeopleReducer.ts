import { createSlice } from '@reduxjs/toolkit';
import { ChoosePeople } from '@store/index/index.props';

const initialState: ChoosePeople = {
    users: []
};

export const ChoosePeopleReducer = createSlice({
    name: 'choosePeople',
    initialState,
    reducers: {
        setUsersAction: (state, action) => {
            state.users = action.payload;
        },
        resetUserState: () => initialState
    }
});

export const { setUsersAction } = ChoosePeopleReducer.actions;

export default ChoosePeopleReducer.reducer;
