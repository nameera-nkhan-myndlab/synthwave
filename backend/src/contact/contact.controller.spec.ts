import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let controller: ContactController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test', email: 'a@b.com', message: 'hi', createdAt: '2024-01-01T00:00:00.000Z' }]),
    create: jest.fn().mockResolvedValue({ id: 2, name: 'New', email: 'n@b.com', message: 'hello', createdAt: '2024-01-02T00:00:00.000Z' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [{ provide: ContactService, useValue: mockService }],
    }).compile();
    controller = module.get(ContactController);
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