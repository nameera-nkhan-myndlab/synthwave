import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    chat(dto: ChatDto): Promise<{
        reply: string;
    }>;
}
