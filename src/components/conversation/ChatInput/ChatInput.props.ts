import { Ref } from 'react';
import { TextInput } from 'react-native';

export interface ChatInputProps {
    reference: Ref<TextInput>;
    conversationId: number;
    onSend: (message: string, buffer?: string, fileName?: string) => void;
    name: string;
}
