import React, { useCallback, useRef, useState } from 'react';
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
import { postRequestUser } from '@utils/Axios/Axios.service';
import { ResponseUploadImageInterface } from '@interfaces/response/Response.interface';
import { HuddlePhotoPostInterface } from '@interfaces/post/Post.inteface';
import { HuddlePhotoPreview } from '@components/huddles/HuddlePhotoPreview/HuddlePhotoPreview';

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
    const [photo, setPhoto] = useState<string>();

    const input = useRef<TextInput>();

    const onPressPhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');

            input?.current?.focus();

            setPhoto(image?.path);

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

    const onRemovePhoto = useCallback(() => {
        onPhotoRemove();
        setPhoto(null);
    }, [onPhotoRemove]);

    return (
        <View style={[PostHuddleCardStyle.container, style]}>
            <View style={PostHuddleCardStyle.row}>
                <ProfilePhoto
                    name={firstname}
                    photo={profilePhoto}
                    size={32}
                    textBackgroundColor={COLORS.BLACK_100}
                />
                <View style={PostHuddleCardStyle.nameView}>
                    <Text style={PostHuddleCardStyle.nameText}>
                        {firstname}
                    </Text>
                </View>
            </View>
            <TextInput
                ref={input}
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
                {photo ? (
                    <HuddlePhotoPreview
                        photo={photo}
                        onPressRemove={onRemovePhoto}
                    />
                ) : (
                    <TouchableOpacity onPress={onPressPhoto}>
                        <Text style={PostHuddleCardStyle.photoButtonText}>
                            📸
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={onSend}
                    disabled={!message && !photo?.length}
                    style={PostHuddleCardStyle.postButtonView}
                >
                    <Text
                        style={[
                            PostHuddleCardStyle.postButtonText,
                            !message &&
                                !photo?.length &&
                                PostHuddleCardStyle.sendButtonTextOpacity
                        ]}
                    >
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

PostHuddleCard.defaultProps = PostHuddleCardDefaultProps;
