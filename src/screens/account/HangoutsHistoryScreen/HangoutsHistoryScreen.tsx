import React, { useRef } from 'react';
import { SectionList } from '@components/general/SectionList/SectionList';
import { HangoutsHistoryScreenStyle } from '@screens/account/HangoutsHistoryScreen/HangoutsHistoryScreen.style';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { SectionListForwardRefProps } from '@components/general/SectionList/SectionList.props';

export const HangoutsHistoryScreen = (): JSX.Element => {
    const sectionListRef = useRef<SectionListForwardRefProps>();

    useNavigation(RootStackNavigatorEnum.AccountStack, () => {
        sectionListRef?.current?.loadHangouts();
    });

    return (
        <SectionList
            ref={sectionListRef}
            isHistory
            contentContainerStyle={HangoutsHistoryScreenStyle.contentContainer}
        />
    );
};
