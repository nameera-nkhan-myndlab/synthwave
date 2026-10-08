"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../project/project.entity");
const skill_entity_1 = require("../skill/skill.entity");
const project_skill_entity_1 = require("../project/project-skill.entity");
const contact_message_entity_1 = require("../contact/contact-message.entity");
let SeedService = class SeedService {
    constructor(projectRepo, skillRepo, psRepo, contactRepo) {
        this.projectRepo = projectRepo;
        this.skillRepo = skillRepo;
        this.psRepo = psRepo;
        this.contactRepo = contactRepo;
    }
    async onModuleInit() {
        const count = await this.projectRepo.count();
        if (count > 0)
            return;
        const skills = await this.skillRepo.save([
            { name: 'Python', category: 'language', proficiency: 95 },
            { name: 'PyTorch', category: 'framework', proficiency: 90 },
            { name: 'TensorFlow', category: 'framework', proficiency: 85 },
            { name: 'Transformers', category: 'framework', proficiency: 92 },
            { name: 'Docker', category: 'tool', proficiency: 88 },
            { name: 'CUDA', category: 'tool', proficiency: 80 },
            { name: 'AWS', category: 'platform', proficiency: 82 },
            { name: 'GPT-4', category: 'model', proficiency: 90 },
            { name: 'Stable Diffusion', category: 'model', proficiency: 85 },
            { name: 'OpenCV', category: 'framework', proficiency: 78 },
            { name: 'TypeScript', category: 'language', proficiency: 88 },
            { name: 'TensorRT', category: 'tool', proficiency: 75 },
        ]);
        const projects = await this.projectRepo.save([
            { title: 'Neon_GPT', description: 'Custom transformer model fine-tuned on 80s synthwave lyrics and cyberpunk literature.', featured: true, sortOrder: 1 },
            { title: 'Synth-Audio Gen', description: 'Latent diffusion model for generating retro-wave drum samples and analog synth stems.', featured: true, sortOrder: 2 },
            { title: 'Retina_Scan CV', description: 'Real-time computer vision pipeline for aesthetic filtering and retro overlay effects.', featured: true, sortOrder: 3 },
            { title: 'Neural Style Transfer', description: 'Apply synthwave aesthetics to any image using neural style transfer with custom loss functions.', featured: false, sortOrder: 4 },
            { title: 'Voice Synth API', description: 'REST API for generating synthetic voiceovers with retro vocoder effects.', featured: false, sortOrder: 5 },
        ]);
        const links = [
            { projectId: projects[0].id, skillId: skills[1].id },
            { projectId: projects[0].id, skillId: skills[3].id },
            { projectId: projects[1].id, skillId: skills[8].id },
            { projectId: projects[1].id, skillId: skills[5].id },
            { projectId: projects[2].id, skillId: skills[9].id },
            { projectId: projects[2].id, skillId: skills[11].id },
            { projectId: projects[3].id, skillId: skills[1].id },
            { projectId: projects[4].id, skillId: skills[0].id },
        ];
        await this.psRepo.save(links);
        await this.contactRepo.save([
            { name: 'Nova Studios', email: 'recruiter@nova.sys', message: 'Contract: Generative Audio Models' },
            { name: 'Marcus Chen', email: 'm.chen@cyber.net', message: 'Collaboration on LLM integration' },
            { name: 'Zephyr Tech', email: 'hello@zephyr.io', message: 'Bug report in Synth-Audio repo' },
        ]);
        console.log('Seed data inserted');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(project_skill_entity_1.ProjectSkill)),
    __param(3, (0, typeorm_1.InjectRepository)(contact_message_entity_1.ContactMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map