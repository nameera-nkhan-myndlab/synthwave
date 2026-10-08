import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private repo: Repository<Skill>) {}

  findAll(): Promise<Skill[]> { return this.repo.find({ order: { category: 'ASC', name: 'ASC' } }); }

  async create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.repo.create(dto);
    return this.repo.save(skill);
  }

  async remove(id: number): Promise<void> {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Skill not found');
    await this.repo.remove(s);
  }
}