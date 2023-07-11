import React, { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useOpenProfilePhoto } from '@hooks/useOpenProfilePhoto';
import { useOpenChat } from '@hooks/useOpenChat';
import { HuddleInteractionInterface } from '@screens/account/HuddleScreen/HuddleScreen.props';
import { HuddleInteractionsListItem } from '@components/huddles/HuddleInteractionsListItem/HuddleInteractionsListItem';

export const useRenderInteractions = (): {
    renderInteractionItem: ({
        item
    }: ListRenderItemInfo<HuddleInteractionInterface>) => JSX.Element;
    keyInteractionExtractor: (item: HuddleInteractionInterface) => string;
} => {
    const openProfilePhoto = useOpenProfilePhoto();
    const openChat = useOpenChat();

    const renderInteractionItem = useCallback(
        ({
            item
        }: ListRenderItemInfo<HuddleInteractionInterface>): JSX.Element => (
            <HuddleInteractionsListItem
                item={item}
                onPressPhoto={() =>
                    openProfilePhoto(item.name, item?.profilePhoto)
                }
                onOpenChat={() =>
                    openChat(item.name, item?.profilePhoto, item.username)
                }
            />
        ),
        [openChat, openProfilePhoto]
    );

    const keyInteractionExtractor = (
        item: HuddleInteractionInterface
    ): string => item?.username?.toString();

    return { renderInteractionItem, keyInteractionExtractor };
};
