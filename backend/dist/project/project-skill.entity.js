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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSkill = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const skill_entity_1 = require("../skill/skill.entity");
let ProjectSkill = class ProjectSkill {
};
exports.ProjectSkill = ProjectSkill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProjectSkill.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ProjectSkill.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (p) => p.projectSkills, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], ProjectSkill.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skill_entity_1.Skill, (s) => s.projectSkills, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'skillId' }),
    __metadata("design:type", skill_entity_1.Skill)
], ProjectSkill.prototype, "skill", void 0);
exports.ProjectSkill = ProjectSkill = __decorate([
    (0, typeorm_1.Entity)()
], ProjectSkill);
//# sourceMappingURL=project-skill.entity.js.map