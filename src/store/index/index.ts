import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import ChoosePeopleReducer from '@store/ChoosePeopleReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        choosePeople: ChoosePeopleReducer
    }
});
