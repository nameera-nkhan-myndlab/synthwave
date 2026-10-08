import { ProjectSkill } from '../project/project-skill.entity';
export declare class Skill {
    id: number;
    name: string;
    category: string;
    iconUrl: string | null;
    proficiency: number | null;
    projectSkills: ProjectSkill[];
}
