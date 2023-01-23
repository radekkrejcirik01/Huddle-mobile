import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '@env';
import { setProfilePictureAction } from '@store/UserReducer';

export const useUploadPhoto = (
    username: string
): {
    chooseAndUploadPhoto: () => void;
    imageUrl: string;
} => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadImage = useCallback(
        async (image: ImageOrVideo) => {
            const s3bucket = new AWS.S3({
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
                signatureVersion: 'v4'
            });
            const contentType = 'image/jpeg';
            const contentDeposition = `inline;filename="${image?.filename}"`;
            const base64 = await fs.readFile(image?.path, 'base64');
            const arrayBuffer = decode(base64);

            const params = {
                Bucket: 'pingme-bucket',
                Key: `profile_pictures/${username}/${image?.filename}`,
                Body: arrayBuffer,
                ContentDisposition: contentDeposition,
                ContentType: contentType
            };
            s3bucket.upload(
                params,
                (err: Error, data: ManagedUpload.SendData) => {
                    if (err) {
                        Alert.alert('Sorry, upload of the image failed 😔');
                    }
                    setImageUrl(data?.Location);
                }
            );
        },
        [username]
    );

    const chooseAndUploadPhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then((image: ImageOrVideo) => {
            dispatch(setProfilePictureAction(image?.sourceURL));
            uploadImage(image).catch();
        });
    }, [dispatch, uploadImage]);

    return { chooseAndUploadPhoto, imageUrl };
};
