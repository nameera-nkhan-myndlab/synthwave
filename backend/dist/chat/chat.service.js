"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
let ChatService = class ChatService {
    constructor() {
        this.ready = this.init();
    }
    async init() {
        try {
            const mod = await Promise.resolve().then(() => require('@anthropic-ai/sdk'));
            const Anthropic = mod.default ?? mod;
            const apiKey = process.env.ANTHROPIC_API_KEY;
            if (!apiKey) {
                console.error('[ChatService] ANTHROPIC_API_KEY is not set');
            }
            this.client = new Anthropic({ apiKey: apiKey || '' });
        }
        catch (err) {
            console.error('[ChatService] Failed to load @anthropic-ai/sdk', err);
        }
    }
    async chat(message, history) {
        await this.ready;
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY not configured');
        }
        if (!this.client) {
            throw new Error('Anthropic SDK failed to load');
        }
        const systemPrompt = `You are Synth, the AI assistant embedded in K. Flynn's portfolio website — a synthwave-themed portfolio for an AI engineer. You help visitors learn about K. Flynn's projects, skills, and experience. Be friendly, concise, and stay in character with the retro-futuristic aesthetic. If asked about things unrelated to the portfolio, gently steer back to relevant topics. Keep responses under 150 words.`;
        const messages = [
            ...history.map((h) => ({ role: h.role, content: h.content })),
            { role: 'user', content: message },
        ];
        try {
            const response = await this.client.messages.create({
                model: 'claude-sonnet-5',
                max_tokens: 512,
                system: systemPrompt,
                messages,
            });
            const textBlock = response.content.find((b) => b.type === 'text');
            return textBlock ? textBlock.text : 'Signal lost. Please try again.';
        }
        catch (err) {
            console.error('[ChatService] Anthropic API error:', err?.status, err?.error?.type, err?.message);
            throw new Error('AI service unavailable. Please try again later.');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatService);
//# sourceMappingURL=chat.service.js.map