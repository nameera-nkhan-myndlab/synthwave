import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectSkill } from '../project/project-skill.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  iconUrl: string | null;

  @Column({ type: 'int', nullable: true })
  proficiency: number | null;

  @OneToMany(() => ProjectSkill, (ps) => ps.skill)
  projectSkills: ProjectSkill[];
}