import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectSkill } from './project-skill.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  repoUrl: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  liveUrl: string | null;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @OneToMany(() => ProjectSkill, (ps) => ps.project)
  projectSkills: ProjectSkill[];
}