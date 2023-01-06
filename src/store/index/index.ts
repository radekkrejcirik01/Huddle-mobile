import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';

export default configureStore({
    reducer: {
        user: UserReducer
    }
});
