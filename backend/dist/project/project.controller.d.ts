import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly svc;
    constructor(svc: ProjectService);
    findAll(): Promise<import("./project.entity").Project[]>;
    findOne(id: number): Promise<import("./project.entity").Project>;
    create(dto: CreateProjectDto): Promise<import("./project.entity").Project>;
    update(id: number, dto: UpdateProjectDto): Promise<import("./project.entity").Project>;
    remove(id: number): Promise<void>;
}
