import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { initErrorReporter } from '@/lib/errorReporter';
import ChatWidget from '@/components/ChatWidget';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => { initErrorReporter(); }, []);
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}