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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./project.entity");
const project_skill_entity_1 = require("./project-skill.entity");
let ProjectService = class ProjectService {
    constructor(projectRepo, psRepo) {
        this.projectRepo = projectRepo;
        this.psRepo = psRepo;
    }
    async findAll() {
        return this.projectRepo.find({
            relations: { projectSkills: { skill: true } },
            order: { sortOrder: 'ASC' },
        });
    }
    async findOne(id) {
        const p = await this.projectRepo.findOne({
            where: { id },
            relations: { projectSkills: { skill: true } },
        });
        if (!p)
            throw new common_1.NotFoundException('Project not found');
        return p;
    }
    async create(dto) {
        const { skillIds, ...rest } = dto;
        const project = this.projectRepo.create(rest);
        const saved = await this.projectRepo.save(project);
        if (skillIds?.length) {
            const links = skillIds.map((sid) => this.psRepo.create({ projectId: saved.id, skillId: sid }));
            await this.psRepo.save(links);
        }
        return saved;
    }
    async update(id, dto) {
        const project = await this.findOne(id);
        const { skillIds, ...rest } = dto;
        Object.keys(rest).forEach((k) => {
            if (rest[k] !== undefined)
                project[k] = rest[k];
        });
        await this.projectRepo.save(project);
        if (skillIds !== undefined) {
            await this.psRepo.delete({ projectId: id });
            if (skillIds.length) {
                const links = skillIds.map((sid) => this.psRepo.create({ projectId: id, skillId: sid }));
                await this.psRepo.save(links);
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const p = await this.findOne(id);
        await this.projectRepo.remove(p);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_skill_entity_1.ProjectSkill)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map