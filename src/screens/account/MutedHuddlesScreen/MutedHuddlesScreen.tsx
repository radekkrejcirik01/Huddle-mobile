import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useRenderMutedHuddles } from '@hooks/useRenderMutedHuddles';
import { ReducerProps } from '@store/index/index.props';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseMutedHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { MutedHuddlesScreenStyle } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.style';
import { MutedHuddlesItemProps } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const MutedHuddlesScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [mutedPeople, setMutedPeople] = useState<
        Array<MutedHuddlesItemProps>
    >([]);

    const loadMutedHuddles = useCallback(() => {
        getRequestUser<ResponseMutedHuddlesGetInterface>(
            `muted-huddles/${username}`
        ).subscribe((response: ResponseMutedHuddlesGetInterface) => {
            if (response?.status) {
                setMutedPeople(response.data);
            }
        });
    }, [username]);

    useEffect(() => loadMutedHuddles(), [loadMutedHuddles]);

    const { renderMutedHuddlesItem, refreshControl, keyMutedHuddlesExtractor } =
        useRenderMutedHuddles(loadMutedHuddles);

    return (
        <View style={MutedHuddlesScreenStyle.container}>
            <Text style={MutedHuddlesScreenStyle.title}>
                Mute Huddles from:
            </Text>
            <FlashList
                data={mutedPeople}
                renderItem={renderMutedHuddlesItem}
                refreshControl={refreshControl}
                keyExtractor={keyMutedHuddlesExtractor}
                estimatedItemSize={68}
                ItemSeparatorComponent={() => <ItemSeparator space={10} />}
                contentContainerStyle={
                    MutedHuddlesScreenStyle.listContentContainer
                }
            />
        </View>
    );
};
