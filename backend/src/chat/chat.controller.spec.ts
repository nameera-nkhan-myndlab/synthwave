import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { HttpException } from '@nestjs/common';

describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: { chat: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService);
  });

  it('should return reply on success', async () => {
    (service.chat as jest.Mock).mockResolvedValue('Hello from Synth!');
    const result = await controller.chat({ message: 'Hi' });
    expect(result).toEqual({ reply: 'Hello from Synth!' });
    expect(service.chat).toHaveBeenCalledWith('Hi', []);
  });

  it('should throw 503 on service error', async () => {
    (service.chat as jest.Mock).mockRejectedValue(new Error('API down'));
    await expect(controller.chat({ message: 'Hi' })).rejects.toThrow(HttpException);
  });
});