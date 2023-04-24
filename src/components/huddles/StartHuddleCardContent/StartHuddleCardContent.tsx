import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import COLORS from '@constants/COLORS';
import { StartHuddleCardContentProps } from '@components/huddles/StartHuddleCardContent/StartHuddleCardContent.props';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { StartHuddleCardContentStyle } from '@components/huddles/StartHuddleCardContent/StartHuddleCardContent.style';
import { ReducerProps } from '@store/index/index.props';

export const StartHuddleCardContent = ({
    onWhatChange,
    onWhereChange,
    onWhenChange,
    onPressAddCard
}: StartHuddleCardContentProps): JSX.Element => {
    const { profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    return (
        <View style={StartHuddleCardContentStyle.container}>
            <Text style={StartHuddleCardContentStyle.huddleText}>Huddle</Text>
            <View style={StartHuddleCardContentStyle.cardContainer}>
                <View
                    style={{
                        flex: 1,
                        paddingRight: 10
                    }}
                >
                    <TextInput
                        autoFocus
                        placeholder="What"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={onWhatChange}
                        selectionColor={COLORS.BUTTON_BLUE}
                        style={StartHuddleCardContentStyle.primaryInput}
                    />
                    <TextInput
                        placeholder="Anywhere"
                        autoCorrect={false}
                        onChangeText={onWhereChange}
                        selectionColor={COLORS.BUTTON_BLUE}
                        style={StartHuddleCardContentStyle.secondaryInput}
                    />
                    <TextInput
                        placeholder="Anytime"
                        autoCorrect={false}
                        onChangeText={onWhenChange}
                        selectionColor={COLORS.BUTTON_BLUE}
                        autoCapitalize="none"
                        style={StartHuddleCardContentStyle.secondaryInput}
                    />
                </View>
                <FastImage
                    source={{ uri: profilePhoto }}
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                />
            </View>
            <TouchableOpacity
                onPress={onPressAddCard}
                style={StartHuddleCardContentStyle.addButtonView}
            >
                <Text style={StartHuddleCardContentStyle.addButtonText}>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    );
};
