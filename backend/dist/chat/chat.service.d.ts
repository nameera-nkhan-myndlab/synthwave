interface HistoryMessage {
    role: 'user' | 'assistant';
    content: string;
}
export declare class ChatService {
    private client;
    private ready;
    constructor();
    private init;
    chat(message: string, history: HistoryMessage[]): Promise<string>;
}
export {};
