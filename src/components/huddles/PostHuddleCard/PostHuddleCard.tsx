import React, { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import {
    PostHuddleCardDefaultProps,
    PostHuddleCardProps
} from '@components/huddles/PostHuddleCard/PostHuddleCard.props';
import { PostHuddleCardStyle } from '@components/huddles/PostHuddleCard/PostHuddleCard.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { TouchableOpacity } from '@components/general/TouchableOpacity/TouchableOpacity';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { IconButton } from '@components/general/IconButton/IconButton';
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseUploadImageInterface } from '@interfaces/response/Response.interface';
import { HuddlePhotoPostInterface } from '@interfaces/post/Post.inteface';
import { HuddlePhotosPreviews } from '@components/huddles/HuddlePhotosPreviews/HuddlePhotosPreviews';

export const PostHuddleCard = ({
    onMessageChange,
    onPhotoChoose,
    onPhotoRemove,
    onSend,
    style
}: PostHuddleCardProps): JSX.Element => {
    const { firstname, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const [message, setMessage] = useState<string>();
    const [photos, setPhotos] = useState<Array<string>>([]);

    const onPressPhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');

            setPhotos((value) => value.concat(image?.path));

            postRequestUser<
                ResponseUploadImageInterface,
                HuddlePhotoPostInterface
            >('huddle-photo', {
                buffer: base64,
                fileName: image?.filename
            }).subscribe((response: ResponseUploadImageInterface) => {
                if (response?.status) {
                    onPhotoChoose(response?.imageUrl);
                }
            });
        });
    }, [onPhotoChoose]);

    const onRemovePhoto = useCallback(
        (index: number) => {
            onPhotoRemove(index);
            setPhotos((photosValue) =>
                photosValue.filter((value, i) => i !== index)
            );
        },
        [onPhotoRemove]
    );

    return (
        <View style={[PostHuddleCardStyle.container, style]}>
            <View style={PostHuddleCardStyle.row}>
                <ProfilePhoto
                    name={firstname}
                    photo={profilePhoto}
                    size={40}
                    textBackgroundColor={COLORS.BLACK_100}
                />
                <View style={PostHuddleCardStyle.titleView}>
                    <Text style={PostHuddleCardStyle.titleText}>
                        {firstname}
                    </Text>
                </View>
            </View>
            <TextInput
                autoFocus
                autoCorrect={false}
                onChangeText={(value) => {
                    onMessageChange(value);
                    setMessage(value);
                }}
                selectionColor={COLORS.WHITE}
                multiline
                style={PostHuddleCardStyle.input}
            />
            <View style={PostHuddleCardStyle.buttonsContainer}>
                <View>
                    <HuddlePhotosPreviews
                        photos={photos}
                        onPressRemove={onRemovePhoto}
                    />
                    {photos?.length < 4 && (
                        <TouchableOpacity onPress={onPressPhoto}>
                            <Text style={PostHuddleCardStyle.photoButtonText}>
                                📸
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <IconButton
                    icon={IconEnum.SEND}
                    onPress={onSend}
                    size={25}
                    style={
                        !message &&
                        !photos?.length &&
                        PostHuddleCardStyle.sendButtonOpacity
                    }
                    disabled={!message && !photos?.length}
                />
            </View>
        </View>
    );
};

PostHuddleCard.defaultProps = PostHuddleCardDefaultProps;
