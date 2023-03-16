import { createSlice } from '@reduxjs/toolkit';
import { SelectUsers } from '@store/index/index.props';

const initialState: SelectUsers = {
    selectedUsernames: [],
    selectedUsers: []
};

export const SelectUsersReducer = createSlice({
    name: 'selectUsers',
    initialState,
    reducers: {
        setSelectedUsernamesAction: (state, action) => {
            state.selectedUsernames = action.payload;
        },
        setSelectedUsersAction: (state, action) => {
            state.selectedUsers = action.payload;
        },
        resetSelectedState: () => initialState
    }
});

export const {
    setSelectedUsernamesAction,
    setSelectedUsersAction,
    resetSelectedState
} = SelectUsersReducer.actions;

export default SelectUsersReducer.reducer;
