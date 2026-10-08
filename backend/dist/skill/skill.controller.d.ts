import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
export declare class SkillController {
    private readonly svc;
    constructor(svc: SkillService);
    findAll(): Promise<import("./skill.entity").Skill[]>;
    create(dto: CreateSkillDto): Promise<import("./skill.entity").Skill>;
    remove(id: number): Promise<void>;
}
