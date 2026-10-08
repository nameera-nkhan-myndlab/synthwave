import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

describe('SkillController', () => {
  let controller: SkillController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Python', category: 'language', proficiency: 95 }]),
    create: jest.fn().mockResolvedValue({ id: 2, name: 'Rust', category: 'language', proficiency: 70 }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [{ provide: SkillService, useValue: mockService }],
    }).compile();
    controller = module.get(SkillController);
  });

  it('GET /api/skills returns array', async () => {
    const result = await controller.findAll();
    expect(result[0].name).toBe('Python');
  });

  it('POST /api/skills creates skill', async () => {
    const result = await controller.create({ name: 'Rust', category: 'language' });
    expect(result.id).toBe(2);
  });
});