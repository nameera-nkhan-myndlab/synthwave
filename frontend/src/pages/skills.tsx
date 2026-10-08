import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import homeStyles from '@/styles/Home.module.css';
import styles from '@/styles/Skills.module.css';

interface Skill { id: number; name: string; category: string; proficiency: number | null }

const categoryLabels: Record<string, string> = {
  language: 'Languages', framework: 'Frameworks', tool: 'Tools', platform: 'Platforms', model: 'Models',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => { apiClient.get('/api/skills').then(r => setSkills(r.data)).catch(() => {}); }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <div className={homeStyles.shell}>
      <div className={homeStyles.scanlines} />
      <Sidebar activeRoute="/skills" />
      <main className={homeStyles.main}>
        <header className={homeStyles.topbar}>
          <div><h2 className={homeStyles.topTitle}>Neural Nets (Skills)</h2></div>
        </header>
        <div className={styles.content}>
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className={styles.group}>
              <h3 className={styles.catLabel}>{categoryLabels[cat] || cat}</h3>
              <div className={styles.skillGrid}>
                {items.map(s => (
                  <div key={s.id} className={styles.skillCard}>
                    <div className={styles.skillName}>{s.name}</div>
                    {s.proficiency != null && (
                      <div className={styles.bar}><div className={styles.barFill} style={{ width: `${s.proficiency}%` }} /></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}