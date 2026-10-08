"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const skill_controller_1 = require("./skill.controller");
const skill_service_1 = require("./skill.service");
describe('SkillController', () => {
    let controller;
    const mockService = {
        findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Python', category: 'language', proficiency: 95 }]),
        create: jest.fn().mockResolvedValue({ id: 2, name: 'Rust', category: 'language', proficiency: 70 }),
        remove: jest.fn().mockResolvedValue(undefined),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [skill_controller_1.SkillController],
            providers: [{ provide: skill_service_1.SkillService, useValue: mockService }],
        }).compile();
        controller = module.get(skill_controller_1.SkillController);
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
//# sourceMappingURL=skill.controller.spec.js.map