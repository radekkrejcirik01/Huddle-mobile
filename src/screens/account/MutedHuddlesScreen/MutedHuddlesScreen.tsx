import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRenderMutedHuddles } from '@hooks/useRenderMutedHuddles';
import { getRequestUser } from '@utils/Axios/Axios.service';
import { ResponseMutedHuddlesGetInterface } from '@interfaces/response/Response.interface';
import { MutedHuddlesScreenStyle } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.style';
import { MutedHuddlesItemProps } from '@screens/account/MutedHuddlesScreen/MutedHuddlesScreen.props';
import { ItemSeparator } from '@components/general/ItemSeparator/ItemSeparator';

export const MutedHuddlesScreen = (): JSX.Element => {
    const [mutedPeople, setMutedPeople] = useState<
        Array<MutedHuddlesItemProps>
    >([]);

    const loadMutedHuddles = () =>
        getRequestUser<ResponseMutedHuddlesGetInterface>(
            'muted-huddles'
        ).subscribe((response: ResponseMutedHuddlesGetInterface) => {
            if (response?.status) {
                setMutedPeople(response.data);
            }
        });

    useEffect(() => {
        loadMutedHuddles();
    }, []);

    const { renderMutedHuddlesItem, refreshControl, keyMutedHuddlesExtractor } =
        useRenderMutedHuddles(loadMutedHuddles);

    return (
        <View style={MutedHuddlesScreenStyle.container}>
            {mutedPeople?.length ? (
                <Text style={MutedHuddlesScreenStyle.title}>
                    Muted Huddles from:
                </Text>
            ) : (
                <Text style={MutedHuddlesScreenStyle.title}>
                    No muted Huddles
                </Text>
            )}
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
