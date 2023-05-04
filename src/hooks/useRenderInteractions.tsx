import React, { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { HuddleConfirmPostInterface } from '@interfaces/post/Post.inteface';
import { HuddleItemInterface } from '@screens/account/HuddlesScreen/HuddlesScreen.props';

export const useRenderInteractions = (
    huddle: HuddleItemInterface,
    isConfirmed: boolean,
    onConfirm: () => void
): {
    renderInteractionItem: ({
        item
    }: ListRenderItemInfo<HuddleInteractionInterface>) => JSX.Element;
    keyInteractionExtractor: (item: HuddleInteractionInterface) => string;
} => {
    const confirm = useCallback(
        (username: string) => {
            postRequestUser<ResponseInterface, HuddleConfirmPostInterface>(
                'huddle/confirm',
                {
                    huddleId: huddle?.id,
                    sender: huddle?.createdBy,
                    receiver: username
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    onConfirm();
                }
            });
        },
        [huddle?.createdBy, huddle?.id, onConfirm]
    );

    const renderInteractionItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<HuddleInteractionInterface>): JSX.Element => (
            <HuddleInteractionsListItem
                item={item}
                isConfirmed={isConfirmed}
                onConfirm={confirm}
            />
        ),
        [confirm, isConfirmed]
    );

    const keyInteractionExtractor = (
        item: HuddleInteractionInterface
    ): string => item?.id?.toString();

    return { renderInteractionItem, keyInteractionExtractor };
};
