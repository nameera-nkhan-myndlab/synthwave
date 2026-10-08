"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const contact_controller_1 = require("./contact.controller");
const contact_service_1 = require("./contact.service");
describe('ContactController', () => {
    let controller;
    const mockService = {
        findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test', email: 'a@b.com', message: 'hi', createdAt: '2024-01-01T00:00:00.000Z' }]),
        create: jest.fn().mockResolvedValue({ id: 2, name: 'New', email: 'n@b.com', message: 'hello', createdAt: '2024-01-02T00:00:00.000Z' }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [contact_controller_1.ContactController],
            providers: [{ provide: contact_service_1.ContactService, useValue: mockService }],
        }).compile();
        controller = module.get(contact_controller_1.ContactController);
    });
    it('GET /api/contact returns messages', async () => {
        const result = await controller.findAll();
        expect(result[0].email).toBe('a@b.com');
    });
    it('POST /api/contact creates message', async () => {
        const result = await controller.create({ name: 'New', email: 'n@b.com', message: 'hello' });
        expect(result.id).toBe(2);
    });
});
//# sourceMappingURL=contact.controller.spec.js.map