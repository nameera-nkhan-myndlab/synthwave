import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';
import { Skill } from '../skill/skill.entity';
import { ProjectSkill } from '../project/project-skill.entity';
import { ContactMessage } from '../contact/contact-message.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill, ProjectSkill, ContactMessage])],
  providers: [SeedService],
})
export class SeedModule {}