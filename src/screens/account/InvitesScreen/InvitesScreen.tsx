import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useRenderInvites } from '@hooks/useRenderInvites';
import { getRequestUser, putRequestUser } from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseInvitesGetInterface
} from '@interfaces/response/Response.interface';
import { InviteItemProps } from '@screens/account/InvitesScreen/InvitesScreen.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';
import { ReducerProps } from '@store/index/index.props';
import { InvitesScreenStyle } from '@screens/account/InvitesScreen/InvitesScreen.style';

export const InvitesScreen = (): JSX.Element => {
    const { username: user } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [invites, setInvites] = useState<Array<InviteItemProps>>([]);

    const loadInvites = useCallback(() => {
        getRequestUser<ResponseInvitesGetInterface>(
            `invites/${user}`
        ).subscribe((response: ResponseInvitesGetInterface) => {
            if (response?.status) {
                setInvites(response?.data);
            }
        });
    }, [user]);

    const updateSeenInvites = useCallback(() => {
        putRequestUser<ResponseInterface, undefined>(
            `seen-invites/${user}`
        ).subscribe();
    }, [user]);

    useEffect(() => {
        loadInvites();
        updateSeenInvites();
    }, [loadInvites, updateSeenInvites]);

    const { renderInvitesItem, keyInviteExtractor, refreshControl } =
        useRenderInvites(loadInvites);

    return (
        <View style={InvitesScreenStyle.container}>
            <FlashList
                data={invites}
                renderItem={renderInvitesItem}
                keyExtractor={keyInviteExtractor}
                estimatedItemSize={68}
                refreshControl={refreshControl}
                ItemSeparatorComponent={() => <ItemSeparator space={20} />}
            />
        </View>
    );
};
