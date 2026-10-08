import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/project.entity';
import { Skill } from '../skill/skill.entity';
import { ProjectSkill } from '../project/project-skill.entity';
import { ContactMessage } from '../contact/contact-message.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    @InjectRepository(ProjectSkill) private psRepo: Repository<ProjectSkill>,
    @InjectRepository(ContactMessage) private contactRepo: Repository<ContactMessage>,
  ) {}

  async onModuleInit() {
    const count = await this.projectRepo.count();
    if (count > 0) return;

    // Skills
    const skills = await this.skillRepo.save([
      { name: 'Python', category: 'language', proficiency: 95 },
      { name: 'PyTorch', category: 'framework', proficiency: 90 },
      { name: 'TensorFlow', category: 'framework', proficiency: 85 },
      { name: 'Transformers', category: 'framework', proficiency: 92 },
      { name: 'Docker', category: 'tool', proficiency: 88 },
      { name: 'CUDA', category: 'tool', proficiency: 80 },
      { name: 'AWS', category: 'platform', proficiency: 82 },
      { name: 'GPT-4', category: 'model', proficiency: 90 },
      { name: 'Stable Diffusion', category: 'model', proficiency: 85 },
      { name: 'OpenCV', category: 'framework', proficiency: 78 },
      { name: 'TypeScript', category: 'language', proficiency: 88 },
      { name: 'TensorRT', category: 'tool', proficiency: 75 },
    ]);

    // Projects
    const projects = await this.projectRepo.save([
      { title: 'Neon_GPT', description: 'Custom transformer model fine-tuned on 80s synthwave lyrics and cyberpunk literature.', featured: true, sortOrder: 1 },
      { title: 'Synth-Audio Gen', description: 'Latent diffusion model for generating retro-wave drum samples and analog synth stems.', featured: true, sortOrder: 2 },
      { title: 'Retina_Scan CV', description: 'Real-time computer vision pipeline for aesthetic filtering and retro overlay effects.', featured: true, sortOrder: 3 },
      { title: 'Neural Style Transfer', description: 'Apply synthwave aesthetics to any image using neural style transfer with custom loss functions.', featured: false, sortOrder: 4 },
      { title: 'Voice Synth API', description: 'REST API for generating synthetic voiceovers with retro vocoder effects.', featured: false, sortOrder: 5 },
    ]);

    // Link skills to projects
    const links = [
      { projectId: projects[0].id, skillId: skills[1].id }, // PyTorch
      { projectId: projects[0].id, skillId: skills[3].id }, // Transformers
      { projectId: projects[1].id, skillId: skills[8].id }, // Stable Diffusion
      { projectId: projects[1].id, skillId: skills[5].id }, // CUDA
      { projectId: projects[2].id, skillId: skills[9].id }, // OpenCV
      { projectId: projects[2].id, skillId: skills[11].id }, // TensorRT
      { projectId: projects[3].id, skillId: skills[1].id }, // PyTorch
      { projectId: projects[4].id, skillId: skills[0].id }, // Python
    ];
    await this.psRepo.save(links);

    // Contact messages
    await this.contactRepo.save([
      { name: 'Nova Studios', email: 'recruiter@nova.sys', message: 'Contract: Generative Audio Models' },
      { name: 'Marcus Chen', email: 'm.chen@cyber.net', message: 'Collaboration on LLM integration' },
      { name: 'Zephyr Tech', email: 'hello@zephyr.io', message: 'Bug report in Synth-Audio repo' },
    ]);

    console.log('Seed data inserted');
  }
}