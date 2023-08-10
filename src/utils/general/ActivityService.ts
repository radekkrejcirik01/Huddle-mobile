import { putRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ActivityPostInterface } from '@interfaces/post/Post.inteface';
import store from '@store/index/index';

class ActivityServiceClass {
    public updateOnline = () => {
        if (store.getState().user.token)
            putRequestUser<ResponseInterface, ActivityPostInterface>('status', {
                status: 'online'
            }).subscribe();
    };

    public updateOffline = () => {
        if (store.getState().user.token)
            putRequestUser<ResponseInterface, ActivityPostInterface>('status', {
                status: 'offline'
            }).subscribe();
    };
}

const ActivityService: ActivityServiceClass = new ActivityServiceClass();

export { ActivityService };
