export interface ChatInputProps {
    conversationId: number;
    onSend: (message: string, buffer?: string, fileName?: string) => void;
    name: string;
}
