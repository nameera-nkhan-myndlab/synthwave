"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const common_1 = require("@nestjs/common");
describe('ChatController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [chat_controller_1.ChatController],
            providers: [
                {
                    provide: chat_service_1.ChatService,
                    useValue: { chat: jest.fn() },
                },
            ],
        }).compile();
        controller = module.get(chat_controller_1.ChatController);
        service = module.get(chat_service_1.ChatService);
    });
    it('should return reply on success', async () => {
        service.chat.mockResolvedValue('Hello from Synth!');
        const result = await controller.chat({ message: 'Hi' });
        expect(result).toEqual({ reply: 'Hello from Synth!' });
        expect(service.chat).toHaveBeenCalledWith('Hi', []);
    });
    it('should throw 503 on service error', async () => {
        service.chat.mockRejectedValue(new Error('API down'));
        await expect(controller.chat({ message: 'Hi' })).rejects.toThrow(common_1.HttpException);
    });
});
//# sourceMappingURL=chat.controller.spec.js.map