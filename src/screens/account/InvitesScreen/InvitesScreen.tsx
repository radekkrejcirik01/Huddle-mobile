import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRenderInvites } from '@hooks/useRenderInvites';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseInvitesGetInterface
} from '@interfaces/response/Response.interface';
import { InviteItemProps } from '@screens/account/InvitesScreen/InvitesScreen.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { InvitesScreenStyle } from '@screens/account/InvitesScreen/InvitesScreen.style';

export const InvitesScreen = (): JSX.Element => {
    const [invites, setInvites] = useState<Array<InviteItemProps>>([]);

    const loadInvites = (lastId?: number) => {
        let endpoint = 'invites';
        if (lastId) {
            endpoint += `/${lastId}`;
        }

        getRequestUser<ResponseInvitesGetInterface>(endpoint).subscribe(
            (response: ResponseInvitesGetInterface) => {
                if (!lastId) {
                    setInvites(response?.data);
                    return;
                }

                if (lastId && !!response?.data?.length) {
                    setInvites((value) => value.concat(response?.data));
                }
            }
        );
    };

    const updateSeenInvites = () =>
        putRequestUser<ResponseInterface, undefined>(
            'seen-invites'
        ).subscribe();

    useEffect(() => {
        loadInvites();
        updateSeenInvites();
    }, []);

    const {
        renderInvitesItem,
        keyInviteExtractor,
        refreshControl,
        onEndReached
    } = useRenderInvites(invites, loadInvites);

    return (
        <View style={InvitesScreenStyle.container}>
            <FlashList
                data={invites}
                renderItem={renderInvitesItem}
                keyExtractor={keyInviteExtractor}
                estimatedItemSize={68}
                refreshControl={refreshControl}
                ItemSeparatorComponent={() => <ItemSeparator space={20} />}
                onEndReached={onEndReached}
            />
        </View>
    );
};
