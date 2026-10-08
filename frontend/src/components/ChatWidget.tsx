import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api';
import styles from '@/styles/ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Greetings, operator. I\'m Synth — K. Flynn\'s AI assistant. Ask me about projects, skills, or anything portfolio-related.' },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    const history = messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) !== 0);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await apiClient.post('/api/chat', { message: text, history });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Signal disrupted. Please retry transmission.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {!open && (
        <button className={styles.fab} onClick={() => setOpen(true)} aria-label="Open AI Chat">
          <MessageCircle size={22} />
        </button>
      )}
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerDot} />
              <span>SYNTH_AI // ONLINE</span>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <div className={styles.body}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.bubbleBot}`}>
                <Loader2 size={14} className={styles.spin} /> Processing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Enter transmission..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className={styles.sendBtn} onClick={send} disabled={loading || !input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}