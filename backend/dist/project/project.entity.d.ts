import { ProjectSkill } from './project-skill.entity';
export declare class Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    repoUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
    sortOrder: number;
    projectSkills: ProjectSkill[];
}
