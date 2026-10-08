import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() dto: ChatDto) {
    try {
      const reply = await this.chatService.chat(dto.message, dto.history || []);
      return { reply };
    } catch (err: any) {
      console.error('[ChatController] Anthropic error:', err?.status, err?.error?.type, err?.message);
      throw new HttpException(
        'AI service temporarily unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}