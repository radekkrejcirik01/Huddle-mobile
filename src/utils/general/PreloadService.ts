import SplashScreen from 'react-native-splash-screen';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import store from '@store/index/index';
import { setUserStateAction, setUserToken } from '@store/UserReducer';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import { UserGetPostInterface } from '@interfaces/post/Post.inteface';

class PreloadServiceSingleton {
    username: string = null;

    init = async () => {
        const token = await PersistStorage.getItem(PersistStorageKeys.TOKEN);
        this.username = token;
        store.dispatch(setUserToken(token));

        if (token) {
            this.loadUserObject(this.username);
        }
    };

    public loadUserObject = (username: string) => {
        postRequest<ResponseUserGetInterface, UserGetPostInterface>(
            'https://f2twoxgeh8.execute-api.eu-central-1.amazonaws.com/user/get',
            {
                username
            }
        ).subscribe((response: ResponseUserGetInterface) => {
            if (response?.status) {
                store.dispatch(setUserStateAction(response.data));
                SplashScreen.hide();
            }
        });
    };
}

export const PreloadService: PreloadServiceSingleton =
    new PreloadServiceSingleton();
