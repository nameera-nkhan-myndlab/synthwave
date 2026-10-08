declare class HistoryMessageDto {
    role: 'user' | 'assistant';
    content: string;
}
export declare class ChatDto {
    message: string;
    history?: HistoryMessageDto[];
}
export {};
