import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test', description: 'desc', featured: true, sortOrder: 0, projectSkills: [] }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test', description: 'desc', featured: true, sortOrder: 0, projectSkills: [] }),
    create: jest.fn().mockResolvedValue({ id: 1, title: 'New', description: 'desc', featured: false, sortOrder: 0 }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated', description: 'desc', featured: false, sortOrder: 0 }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [{ provide: ProjectService, useValue: mockService }],
    }).compile();
    controller = module.get(ProjectController);
  });

  it('GET /api/projects returns array', async () => {
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].title).toBe('Test');
  });

  it('GET /api/projects/:id returns project', async () => {
    const result = await controller.findOne(1);
    expect(result.id).toBe(1);
  });

  it('POST /api/projects creates', async () => {
    const result = await controller.create({ title: 'New', description: 'desc' });
    expect(result.id).toBe(1);
  });

  it('DELETE /api/projects/:id removes', async () => {
    await expect(controller.remove(1)).resolves.toBeUndefined();
  });
});