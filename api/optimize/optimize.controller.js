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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeController = void 0;
const common_1 = require("@nestjs/common");
const optimize_dto_1 = require("./dto/optimize.dto");
const optimize_service_1 = require("./optimize.service");
let OptimizeController = class OptimizeController {
    constructor(optimizeService) {
        this.optimizeService = optimizeService;
    }
    optimize(imageId, query, res) {
        return this.optimizeService.optimize(imageId, query, res);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, optimize_dto_1.GetOptimizeDto, Object]),
    __metadata("design:returntype", void 0)
], OptimizeController.prototype, "optimize", null);
OptimizeController = __decorate([
    (0, common_1.Controller)('optimize'),
    __metadata("design:paramtypes", [optimize_service_1.OptimizeService])
], OptimizeController);
exports.OptimizeController = OptimizeController;
//# sourceMappingURL=optimize.controller.js.map