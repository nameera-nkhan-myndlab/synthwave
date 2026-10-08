import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import homeStyles from '@/styles/Home.module.css';
import styles from '@/styles/Messages.module.css';

interface ContactMsg { id: number; name: string; email: string; message: string; createdAt: string }

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { apiClient.get('/api/contact').then(r => setMessages(r.data)).catch(() => {}); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await apiClient.post('/api/contact', form);
      setMessages(prev => [res.data, ...prev]);
      setForm({ name: '', email: '', message: '' });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch {} finally { setSending(false); }
  };

  return (
    <div className={homeStyles.shell}>
      <div className={homeStyles.scanlines} />
      <Sidebar activeRoute="/messages" messageCount={messages.length} />
      <main className={homeStyles.main}>
        <header className={homeStyles.topbar}>
          <div><h2 className={homeStyles.topTitle}>Transmissions</h2></div>
        </header>
        <div className={styles.content}>
          <div className={styles.formPanel}>
            <h3 className={styles.formTitle}>Send Transmission</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input className={styles.input} placeholder="Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
              <input className={styles.input} placeholder="Email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
              <textarea className={styles.textarea} placeholder="Message" rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
              <button type="submit" className={styles.submitBtn} disabled={sending}>{sending ? 'Transmitting...' : 'Transmit'}</button>
              {sent && <p className={styles.success}>Transmission sent ✓</p>}
            </form>
          </div>

          <div className={styles.listPanel}>
            <h3 className={styles.formTitle}>All Transmissions</h3>
            {messages.map(m => (
              <div key={m.id} className={styles.msgCard}>
                <div className={styles.msgTop}>
                  <span className={styles.msgName}>{m.name}</span>
                  <span className={styles.msgEmail}>{m.email}</span>
                </div>
                <p className={styles.msgBody}>{m.message}</p>
                <span className={styles.msgDate}>{new Date(m.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}