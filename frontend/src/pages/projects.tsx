import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import { Plus, ExternalLink, Github, Star } from 'lucide-react';
import styles from '@/styles/Projects.module.css';
import homeStyles from '@/styles/Home.module.css';

interface ProjectSkillItem { id: number; skill: { id: number; name: string; category: string } }
interface Project { id: number; title: string; description: string; imageUrl: string | null; repoUrl: string | null; liveUrl: string | null; featured: boolean; sortOrder: number; projectSkills: ProjectSkillItem[] }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => { apiClient.get('/api/projects').then(r => setProjects(r.data)).catch(() => {}); }, []);

  return (
    <div className={homeStyles.shell}>
      <div className={homeStyles.scanlines} />
      <Sidebar activeRoute="/projects" />
      <main className={homeStyles.main}>
        <header className={homeStyles.topbar}>
          <div>
            <h2 className={homeStyles.topTitle}>Constructs Database</h2>
            <div className={homeStyles.topMeta}><span className={homeStyles.liveIndicator}>● LIVE</span></div>
          </div>
        </header>
        <div className={styles.grid}>
          {projects.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{p.title}</h3>
                <Star size={16} className={p.featured ? styles.starOn : styles.starOff} />
              </div>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.tags}>
                {p.projectSkills?.map(ps => (
                  <span key={ps.id} className={styles.tag}>{ps.skill.name}</span>
                ))}
              </div>
              <div className={styles.links}>
                {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.extLink}><Github size={14} /> Repo</a>}
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.extLink}><ExternalLink size={14} /> Live</a>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}