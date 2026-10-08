import Link from 'next/link';
import { Cpu, LayoutDashboard, TerminalSquare, Network, Radio, Activity, Settings2, LogOut } from 'lucide-react';
import styles from '@/styles/Sidebar.module.css';

interface Props { activeRoute: string; messageCount?: number; }

export default function Sidebar({ activeRoute, messageCount = 0 }: Props) {
  const navItems = [
    { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} />, section: 'core' },
    { href: '/projects', label: 'Constructs (Projects)', icon: <TerminalSquare size={16} />, section: 'core' },
    { href: '/skills', label: 'Neural Nets (Skills)', icon: <Network size={16} />, section: 'core' },
    { href: '/messages', label: 'Transmissions', icon: <Radio size={16} />, section: 'core', badge: messageCount > 0 ? `${messageCount} New` : undefined },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}><Cpu size={20} color="#fff" /></div>
        <div>
          <h1 className={styles.brandName}>SYNTHWAVE</h1>
          <p className={styles.brandSub}>Portfolio OS_v2.4</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.sectionLabel}>Core Systems</div>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className={`${styles.navItem} ${activeRoute === item.href ? styles.navItemActive : ''}`}>
            <div className={styles.navItemInner}>
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </Link>
        ))}
      </nav>

      <div className={styles.userBlock}>
        <div className={styles.userInner}>
          <div className={styles.userAvatar}>
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="avatar" />
            <div className={styles.onlineDot} />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>K. Flynn</p>
            <p className={styles.userRole}>AI Architect // ROOT</p>
          </div>
          <button className={styles.logoutBtn}><LogOut size={16} /></button>
        </div>
      </div>
    </aside>
  );
}