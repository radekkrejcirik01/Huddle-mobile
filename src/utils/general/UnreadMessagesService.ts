import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseUnreadMessagesGetInterface } from '@interfaces/response/Response.interface';
import store from '@store/index/index';
import { setUnreadMessagesAction } from '@store/UnreadMessagesReducer';

class Service {
    public loadUnread = () => {
        if (store.getState().user.token) {
            getRequestUser<ResponseUnreadMessagesGetInterface>(
                'unread-messages'
            ).subscribe((response: ResponseUnreadMessagesGetInterface) => {
                if (response?.status) {
                    store.dispatch(setUnreadMessagesAction(response?.unread));
                }
            });
        }
    };
}

export const UnreadMessagesService: Service = new Service();
