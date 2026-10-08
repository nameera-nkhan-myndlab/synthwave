import { Project } from './project.entity';
import { Skill } from '../skill/skill.entity';
export declare class ProjectSkill {
    id: number;
    projectId: number;
    skillId: number;
    project: Project;
    skill: Skill;
}
