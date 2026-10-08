import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectSkill } from './project-skill.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectSkill])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}