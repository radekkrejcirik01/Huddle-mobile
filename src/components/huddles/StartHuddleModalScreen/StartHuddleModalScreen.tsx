import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { StartHuddleModalScreenStyle } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen.style';
import { useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props';
import { StartHuddleCardContent } from '@components/huddles/StartHuddleCardContent/StartHuddleCardContent';
import { StartHuddlePeopleContent } from '@components/huddles/StartHuddlePeopleContent/StartHuddlePeopleContent';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { AddHuddlePostInterface } from '@interfaces/post/Post.inteface';
import { StartHuddleModalScreenProps } from '@components/huddles/StartHuddleModalScreen/StartHuddleModalScreen.props';

export const StartHuddleModalScreen = ({
    onClose
}: StartHuddleModalScreenProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [what, setWhat] = useState<string>();
    const [where, setWhere] = useState<string>();
    const [when, setWhen] = useState<string>();
    const [people, setPeople] = useState<Array<string>>([]);

    const [showPeopleContent, setShowPeopleContent] = useState<boolean>(false);

    const onPressAddCard = useCallback(() => {
        if (what) {
            setShowPeopleContent(true);
        } else {
            Alert.alert('To add Huddle, please type what would you like to do');
        }
    }, [what]);

    const addHuddle = useCallback(() => {
        onClose();
        postRequestUser<ResponseInterface, AddHuddlePostInterface>('huddle', {
            sender: username,
            what,
            where,
            when,
            people
        }).subscribe();
    }, [onClose, people, username, what, when, where]);

    return (
        <View style={StartHuddleModalScreenStyle.screen}>
            {showPeopleContent ? (
                <StartHuddlePeopleContent
                    onPeopleChange={setPeople}
                    onPressAddCard={addHuddle}
                />
            ) : (
                <StartHuddleCardContent
                    onWhatChange={setWhat}
                    onWhereChange={setWhere}
                    onWhenChange={setWhen}
                    onPressAddCard={onPressAddCard}
                />
            )}
        </View>
    );
};
