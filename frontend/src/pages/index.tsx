import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import {
  Cpu, LayoutDashboard, Globe, Bell, Plus, Box, TrendingUp, Eye, Activity,
  MailWarning, RadioReceiver, ArrowRight, Layers, Star, MoreVertical, Terminal
} from 'lucide-react';
import styles from '@/styles/Home.module.css';

interface ProjectSkillItem { id: number; skill: { id: number; name: string; category: string } }
interface Project { id: number; title: string; description: string; featured: boolean; sortOrder: number; projectSkills: ProjectSkillItem[] }
interface ContactMsg { id: number; name: string; email: string; message: string; createdAt: string }
interface Skill { id: number; name: string; category: string; proficiency: number | null }

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    apiClient.get('/api/projects').then(r => setProjects(r.data)).catch(() => {});
    apiClient.get('/api/contact').then(r => setMessages(r.data)).catch(() => {});
    apiClient.get('/api/skills').then(r => setSkills(r.data)).catch(() => {});
  }, []);

  const featured = projects.filter(p => p.featured);
  const unreadCount = Math.min(messages.length, 3);

  return (
    <div className={styles.shell}>
      <div className={styles.scanlines} />
      <Sidebar activeRoute="/" messageCount={unreadCount} />
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div>
            <h2 className={styles.topTitle}>System Overview</h2>
            <div className={styles.topMeta}>
              <Globe size={12} />
              <span>Uplink Established: <span className={styles.metaIp}>192.168.0.254</span></span>
              <span className={styles.metaDivider}>|</span>
              <span className={styles.liveIndicator}>● LIVE</span>
            </div>
          </div>
          <div className={styles.topActions}>
            <button className={styles.bellBtn}>
              <Bell size={20} />
              <span className={styles.bellDot} />
            </button>
            <Link href="/projects#new" className={styles.deployBtn}>
              <Plus size={16} /> Deploy Construct
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          {/* Metrics */}
          <div className={styles.metricsGrid}>
            <MetricCard icon={<Box size={20} />} label="Active Constructs" value={String(projects.length).padStart(2, '0')} accent="pink" badge={<><TrendingUp size={12} /> +2 this cycle</>} barWidth={70} />
            <MetricCard icon={<Cpu size={20} />} label="Models Deployed" value={String(skills.filter(s => s.category === 'model').length).padStart(2, '0')} accent="cyan" badge="Stable" barWidth={100} />
            <MetricCard icon={<Eye size={20} />} label="Portfolio Telemetry" value="4.2" valueSuffix="K" accent="purple" badge={<><Activity size={12} /> Peak Traffic</>} sparkline />
            <MetricCard icon={<MailWarning size={20} />} label="Unread Transmissions" value={String(unreadCount).padStart(2, '0')} accent="hotpink" badge="Action Req." highlight />
          </div>

          {/* Main content grid */}
          <div className={styles.mainGrid}>
            {/* Transmissions table */}
            <div className={styles.tablePanel}>
              <div className={styles.tablePanelHeader}>
                <div className={styles.tablePanelTitle}><RadioReceiver size={20} className={styles.cyanIcon} /> <h3>Recent Transmissions</h3></div>
                <Link href="/messages" className={styles.viewAllLink}>View All <ArrowRight size={12} /></Link>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Originator</th>
                      <th>Vector (Subject)</th>
                      <th>Timestamp</th>
                      <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.slice(0, 4).map((m, i) => {
                      const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                      const isUnread = i < 2;
                      const elapsed = Math.floor((Date.now() - new Date(m.createdAt).getTime()) / 1000);
                      const hrs = Math.floor(elapsed / 3600);
                      const mins = Math.floor((elapsed % 3600) / 60);
                      const secs = elapsed % 60;
                      const ts = `T-${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                      return (
                        <tr key={m.id} className={isUnread ? styles.rowUnread : styles.rowRead}>
                          <td>
                            <div className={styles.originatorCell}>
                              <div className={`${styles.avatar} ${isUnread ? styles.avatarPink : ''}`}>{initials}</div>
                              <div>
                                <div className={styles.originatorName}>{m.name}</div>
                                <div className={styles.originatorEmail}>{m.email}</div>
                              </div>
                            </div>
                          </td>
                          <td><div className={styles.subjectCell}>{m.message}</div></td>
                          <td className={styles.tsCell}>{ts}</td>
                          <td style={{ textAlign: 'right' }}>
                            {isUnread ? (
                              <span className={styles.badgeUnread}><span className={styles.pulseDot} /> Unread</span>
                            ) : i === 3 ? (
                              <span className={styles.badgeReplied}>Replied</span>
                            ) : (
                              <span className={styles.badgeArchived}>Archived</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Featured constructs */}
            <div className={styles.featuredPanel}>
              <div className={styles.featuredHeader}>
                <div className={styles.featuredTitle}><Layers size={16} className={styles.purpleIcon} /> <h3>Featured Constructs</h3></div>
              </div>
              <div className={styles.featuredList}>
                {(featured.length > 0 ? featured : projects).slice(0, 3).map((p, i) => (
                  <div key={p.id} className={`${styles.projectCard} ${i === 0 ? styles.projectCardPink : ''}`}>
                    <div className={styles.projectCardTop}>
                      <h4>{p.title}</h4>
                      <div className={styles.projectCardActions}>
                        <Star size={16} className={p.featured ? styles.starFilled : styles.starEmpty} />
                        <MoreVertical size={16} className={styles.moreIcon} />
                      </div>
                    </div>
                    <p className={styles.projectCardDesc}>{p.description}</p>
                    <div className={styles.tagRow}>
                      {p.projectSkills?.slice(0, 2).map(ps => (
                        <span key={ps.id} className={styles.tag}>{ps.skill.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/projects" className={styles.fullDbLink}>Access Full Database</Link>
            </div>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerLeft}><Terminal size={12} /> SYSTEM RUNNING OK.</div>
            <div>v2.4.01 // SYNTH_CORE</div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, valueSuffix, accent, badge, barWidth, sparkline, highlight }: any) {
  return (
    <div className={`${styles.metricCard} ${styles[`metric_${accent}`]} ${highlight ? styles.metricHighlight : ''}`}>
      <div className={styles.metricTop}>
        <div className={`${styles.metricIcon} ${styles[`metricIcon_${accent}`]}`}>{icon}</div>
        <span className={`${styles.metricBadge} ${styles[`metricBadge_${accent}`]}`}>
          {typeof badge === 'string' ? badge : badge}
        </span>
      </div>
      <p className={styles.metricLabel}>{label}</p>
      <h3 className={styles.metricValue}>{value}{valueSuffix && <span className={styles.metricSuffix}>{valueSuffix}</span>}</h3>
      {barWidth != null && (
        <div className={styles.metricBar}><div className={`${styles.metricBarFill} ${styles[`metricBarFill_${accent}`]}`} style={{ width: `${barWidth}%` }} /></div>
      )}
      {sparkline && (
        <div className={styles.sparkline}>
          {[30, 50, 40, 80, 60, 100, 70].map((h, i) => (
            <div key={i} className={styles.sparkBar} style={{ height: `${h}%`, opacity: 0.3 + (h / 150) }} />
          ))}
        </div>
      )}
    </div>
  );
}