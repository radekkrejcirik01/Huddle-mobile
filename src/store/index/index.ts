import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import ChoosePeopleReducer from '@store/ChoosePeopleReducer';
import DeviceReducer from '@store/DeviceReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        choosePeople: ChoosePeopleReducer,
        device: DeviceReducer
    }
});
