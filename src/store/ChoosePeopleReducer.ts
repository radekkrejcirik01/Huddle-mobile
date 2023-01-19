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
        resetChoosePeopleState: () => initialState
    }
});

export const { setUsersAction, resetChoosePeopleState } =
    ChoosePeopleReducer.actions;

export default ChoosePeopleReducer.reducer;
