"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const validationPipe = new common_1.ValidationPipe({
    whitelist: true,
    transform: true
});
exports.default = validationPipe;
//# sourceMappingURL=validator.js.map