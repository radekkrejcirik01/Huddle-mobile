import React from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { ReactionsContentProps } from '@components/chat/ReactionsContent/ReactionsContent.props';
import { ReactionsInterface } from '@components/chat/ChatItem/ChatItem.props';
import { ReactionsContentStyle } from '@components/chat/ReactionsContent/ReactionsContent.style';

export const ReactionsContent = ({
    values
}: ReactionsContentProps): JSX.Element => (
    <View style={ReactionsContentStyle.container}>
        <ScrollView
            contentContainerStyle={ReactionsContentStyle.contentContainerStyle}
        >
            {values.map((value: ReactionsInterface, index: number) => (
                <TouchableHighlight
                    key={index.toString() + value.username}
                    style={ReactionsContentStyle.row}
                >
                    <>
                        <Text>{value.reaction}</Text>
                        <Text style={ReactionsContentStyle.text}>
                            {value.username}
                        </Text>
                    </>
                </TouchableHighlight>
            ))}
        </ScrollView>
    </View>
);
