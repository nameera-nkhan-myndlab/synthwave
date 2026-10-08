import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
export declare class SkillService {
    private repo;
    constructor(repo: Repository<Skill>);
    findAll(): Promise<Skill[]>;
    create(dto: CreateSkillDto): Promise<Skill>;
    remove(id: number): Promise<void>;
}
