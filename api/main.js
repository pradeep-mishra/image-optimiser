"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const response_time_1 = __importDefault(require("response-time"));
const app_module_1 = require("./app.module");
const validator_1 = __importDefault(require("./common/validator"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    };
    app.enableCors(corsOptions);
    app.use((req, res, next) => {
        res.setHeader('X-Powered-By', 'Image-API');
        res.setHeader('X-Developed-By', 'Pradeep-Mishra');
        next();
    });
    app.use((0, response_time_1.default)());
    const Env = configService.get('NODE_ENV') || 'local';
    app.useGlobalPipes(validator_1.default);
    app.use((0, express_1.json)({ limit: '3mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '3mb' }));
    await app.listen(configService.get('PORT'));
    common_1.Logger.log(`Server running on port ${configService.get('PORT')}`, 'MainApp');
    return app;
}
module.exports = bootstrap();
//# sourceMappingURL=main.js.map