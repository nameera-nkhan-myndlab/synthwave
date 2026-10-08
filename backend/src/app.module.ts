import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project/project.entity';
import { Skill } from './skill/skill.entity';
import { ProjectSkill } from './project/project-skill.entity';
import { ContactMessage } from './contact/contact-message.entity';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { ContactModule } from './contact/contact.module';
import { HealthModule } from './health/health.module';
import { SeedModule } from './seed/seed.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'mysql-shared',
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DB || 'synthwave_f52e8b6a',
      entities: [Project, Skill, ProjectSkill, ContactMessage],
      synchronize: true,
      ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    ProjectModule,
    SkillModule,
    ContactModule,
    HealthModule,
    SeedModule,
    ChatModule,
  ],
})
export class AppModule {}