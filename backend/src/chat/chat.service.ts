import { Injectable } from '@nestjs/common';

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable()
export class ChatService {
  private client: any;
  private ready: Promise<void>;

  constructor() {
    this.ready = this.init();
  }

  private async init(): Promise<void> {
    try {
      const mod = await import('@anthropic-ai/sdk');
      const Anthropic = mod.default ?? mod;
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        console.error('[ChatService] ANTHROPIC_API_KEY is not set');
      }
      this.client = new Anthropic({ apiKey: apiKey || '' });
    } catch (err) {
      console.error('[ChatService] Failed to load @anthropic-ai/sdk', err);
    }
  }

  async chat(message: string, history: HistoryMessage[]): Promise<string> {
    await this.ready;

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }
    if (!this.client) {
      throw new Error('Anthropic SDK failed to load');
    }

    const systemPrompt = `You are Synth, the AI assistant embedded in K. Flynn's portfolio website — a synthwave-themed portfolio for an AI engineer. You help visitors learn about K. Flynn's projects, skills, and experience. Be friendly, concise, and stay in character with the retro-futuristic aesthetic. If asked about things unrelated to the portfolio, gently steer back to relevant topics. Keep responses under 150 words.`;

    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: 'user' as const, content: message },
    ];

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-5',
        max_tokens: 512,
        system: systemPrompt,
        messages,
      });

      const textBlock = response.content.find((b: any) => b.type === 'text');
      return textBlock ? textBlock.text : 'Signal lost. Please try again.';
    } catch (err: any) {
      console.error('[ChatService] Anthropic API error:', err?.status, err?.error?.type, err?.message);
      throw new Error('AI service unavailable. Please try again later.');
    }
  }
}