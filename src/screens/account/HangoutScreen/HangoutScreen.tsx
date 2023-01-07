import React from 'react';
import { SectionList } from '@components/general/SectionList/SectionList';
import { HangoutScreenStyle } from '@screens/account/HangoutScreen/HangoutScreen.style';

export const HangoutScreen = (): JSX.Element => (
    <SectionList contentContainerStyle={HangoutScreenStyle.contentContainer} />
);
