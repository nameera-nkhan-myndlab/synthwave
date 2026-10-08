import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectSkill } from './project-skill.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(ProjectSkill) private psRepo: Repository<ProjectSkill>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: { projectSkills: { skill: true } },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Project> {
    const p = await this.projectRepo.findOne({
      where: { id },
      relations: { projectSkills: { skill: true } },
    });
    if (!p) throw new NotFoundException('Project not found');
    return p;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const { skillIds, ...rest } = dto;
    const project = this.projectRepo.create(rest);
    const saved = await this.projectRepo.save(project);
    if (skillIds?.length) {
      const links = skillIds.map((sid) => this.psRepo.create({ projectId: saved.id, skillId: sid }));
      await this.psRepo.save(links);
    }
    return saved;
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    const { skillIds, ...rest } = dto;
    Object.keys(rest).forEach((k) => {
      if ((rest as any)[k] !== undefined) (project as any)[k] = (rest as any)[k];
    });
    await this.projectRepo.save(project);
    if (skillIds !== undefined) {
      await this.psRepo.delete({ projectId: id });
      if (skillIds.length) {
        const links = skillIds.map((sid) => this.psRepo.create({ projectId: id, skillId: sid }));
        await this.psRepo.save(links);
      }
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const p = await this.findOne(id);
    await this.projectRepo.remove(p);
  }
}