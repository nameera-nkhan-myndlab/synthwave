export declare enum SkillCategory {
    LANGUAGE = "language",
    FRAMEWORK = "framework",
    TOOL = "tool",
    PLATFORM = "platform",
    MODEL = "model"
}
export declare class CreateSkillDto {
    name: string;
    category: string;
    iconUrl?: string;
    proficiency?: number;
}
