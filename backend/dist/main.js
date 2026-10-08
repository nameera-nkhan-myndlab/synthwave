"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const exact = (process.env.CORS_ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const previewDomain = process.env.PREVIEW_DOMAIN ?? '';
    const localhost = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;
    const previewHost = previewDomain && previewDomain !== 'localhost'
        ? new RegExp(`^https://[a-z0-9-]+\\.${previewDomain.replace(/\./g, '\\.')}$`)
        : null;
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const allowed = exact.includes(origin) || localhost.test(origin) || (previewHost?.test(origin) ?? false);
            return callback(null, allowed);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`Backend running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map