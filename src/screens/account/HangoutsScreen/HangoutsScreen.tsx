import React from 'react';
import { SectionList } from '@components/general/SectionList/SectionList';
import { HangoutsScreenStyle } from '@screens/account/HangoutsScreen/HangoutsScreen.style';

export const HangoutsScreen = (): JSX.Element => (
    <SectionList
        showAll
        contentContainerStyle={HangoutsScreenStyle.contentContainer}
    />
);
