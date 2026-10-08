import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectSkill } from './project-skill.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private projectRepo;
    private psRepo;
    constructor(projectRepo: Repository<Project>, psRepo: Repository<ProjectSkill>);
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    create(dto: CreateProjectDto): Promise<Project>;
    update(id: number, dto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<void>;
}
