import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseNumberInvitesGetInterface } from '@interfaces/response/Response.interface';
import store from '@store/index/index';
import { setUnseenInvites } from '@store/Invites';

class InvitesServiceClass {
    public getUnseenInvites = () => {
        if (store.getState().user.token) {
            getRequestUser<ResponseNumberInvitesGetInterface>(
                'unseen-invites'
            ).subscribe((response: ResponseNumberInvitesGetInterface) => {
                if (response?.status) {
                    store.dispatch(setUnseenInvites(response?.number));
                }
            });
        }
    };
}

const InvitesService: InvitesServiceClass = new InvitesServiceClass();

export { InvitesService };
