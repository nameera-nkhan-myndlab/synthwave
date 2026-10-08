"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./project/project.entity");
const skill_entity_1 = require("./skill/skill.entity");
const project_skill_entity_1 = require("./project/project-skill.entity");
const contact_message_entity_1 = require("./contact/contact-message.entity");
const project_module_1 = require("./project/project.module");
const skill_module_1 = require("./skill/skill.module");
const contact_module_1 = require("./contact/contact.module");
const health_module_1 = require("./health/health.module");
const seed_module_1 = require("./seed/seed.module");
const chat_module_1 = require("./chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST || 'mysql-shared',
                port: parseInt(process.env.MYSQL_PORT || '3306', 10),
                username: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASSWORD || 'root',
                database: process.env.MYSQL_DB || 'synthwave_f52e8b6a',
                entities: [project_entity_1.Project, skill_entity_1.Skill, project_skill_entity_1.ProjectSkill, contact_message_entity_1.ContactMessage],
                synchronize: true,
                ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : false,
            }),
            project_module_1.ProjectModule,
            skill_module_1.SkillModule,
            contact_module_1.ContactModule,
            health_module_1.HealthModule,
            seed_module_1.SeedModule,
            chat_module_1.ChatModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map