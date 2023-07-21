import SplashScreen from 'react-native-splash-screen';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import { setUserStateAction, setUserToken } from '@store/UserReducer';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { setGetStarted } from '@store/GetStartedReducer';

class PreloadServiceSingleton {
    init = async () => {
        const getStarted = await PersistStorage.getItem(
            PersistStorageKeys.GET_STARTED
        );

        if (!getStarted) {
            store.dispatch(setGetStarted(true));
        }

        const token = await PersistStorage.getItem(PersistStorageKeys.TOKEN);
        store.dispatch(setUserToken(token));

        if (token) {
            this.loadUserObject();
        } else {
            SplashScreen.hide();
        }
    };

    public loadUserObject = () => {
        getRequestUser<ResponseUserGetInterface>('user').subscribe(
            (response: ResponseUserGetInterface) => {
                if (response?.status) {
                    store.dispatch(setUserStateAction(response.data));
                }
                SplashScreen.hide();
            }
        );
    };
}

export const PreloadService: PreloadServiceSingleton =
    new PreloadServiceSingleton();
