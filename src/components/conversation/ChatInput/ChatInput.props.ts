export interface ChatInputProps {
    onSend: (message: string, buffer?: string, fileName?: string) => void;
}
