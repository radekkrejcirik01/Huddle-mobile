import React from 'react';
import { Text, View } from 'react-native';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { MessageItemStatusProps } from '@components/conversation/MessageItemStatus/MessageItemStatus.props';
import { MessageItemStatusStyle } from '@components/conversation/MessageItemStatus/MessageItemStatus.style';

export const MessageItemStatus = ({
    item,
    isOutbound
}: MessageItemStatusProps): JSX.Element => (
    <View style={MessageItemStatusStyle.view}>
        <Text style={MessageItemStatusStyle.timeText}>
            {getLocalTimeFromUTCUnix(item.time).format('HH:mm')}
        </Text>
        {isOutbound &&
            (item?.readBy?.length ? (
                <Icon
                    name={IconEnum.SENT_BLUE}
                    size={19}
                    style={MessageItemStatusStyle.sentIcon}
                />
            ) : (
                <Icon
                    name={IconEnum.SENT}
                    size={19}
                    style={MessageItemStatusStyle.sentIcon}
                />
            ))}
        {!!item?.reactions?.length && (
            <View style={MessageItemStatusStyle.reactionsView}>
                {item.reactions.map((value: string) => (
                    <Text
                        key={value}
                        style={MessageItemStatusStyle.reactionText}
                    >
                        {value}
                    </Text>
                ))}
            </View>
        )}
    </View>
);
