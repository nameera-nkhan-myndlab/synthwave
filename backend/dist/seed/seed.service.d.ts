import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../project/project.entity';
import { Skill } from '../skill/skill.entity';
import { ProjectSkill } from '../project/project-skill.entity';
import { ContactMessage } from '../contact/contact-message.entity';
export declare class SeedService implements OnModuleInit {
    private projectRepo;
    private skillRepo;
    private psRepo;
    private contactRepo;
    constructor(projectRepo: Repository<Project>, skillRepo: Repository<Skill>, psRepo: Repository<ProjectSkill>, contactRepo: Repository<ContactMessage>);
    onModuleInit(): Promise<void>;
}
