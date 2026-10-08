export declare class CreateProjectDto {
    title: string;
    description: string;
    imageUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    sortOrder?: number;
    skillIds?: number[];
}
