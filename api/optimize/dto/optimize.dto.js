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
exports.GetOptimizeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Flip;
(function (Flip) {
    Flip["horizontal"] = "h";
    Flip["vertical"] = "v";
})(Flip || (Flip = {}));
class GetOptimizeDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,4}$|^[0-9]{1,4}\,[0-9]{1,4}$|^[0-9]{1,4}\,[0-9]{1,4}\,[a-z]{1,10}$/, {
        message: 'resize value must have format: width or width,height or width,height,fitType'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "resize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^jpg\,?[0-9]{0,3}$|^jpeg\,?[0-9]{0,3}$|^png\,?[0-9]{0,3}$|^webp\,?[0-9]{0,3}$/, {
        message: 'format value must be jpg, jpeg, png, webp with a quality number 1-100. eg: jpeg,100'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}$/, {
        message: 'crop value must be 4 numbers separated by commas. eg:5,5,5,5'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "crop", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[^\,]+$/, {
        message: 'pad value must be 4 numbers followed by color value separated by commas. eg:5,5,5,5,red'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "pad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(1000, {
        message: 'trim value must be a number greater than 0. eg:10'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "trim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,3}$|^[0-9]{1,3}\,[^\,]{1,20}$/, {
        message: 'rotate value must be the number of degrees to rotate the image and the background color separated by commas. eg:90 or 90,red'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "rotate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(Flip, {
        message: 'flip value must be h for horizontal or v for vertical'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "flip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9\.]{1,3}$|^[0-9\.]{1,3}\,[0-9\.]{1,3}\,[0-9\.]{1,3}$/, {
        message: 'sharpen value must be a 1 or 3 numbers separated by commas. eg:6 or 1.5, 0.5, 2.5'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "sharpen", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(1000, {
        message: 'median value must be a number greater than 0 and less than 1/8th of image height or width. eg:10'
    }),
    __metadata("design:type", Number)
], GetOptimizeDto.prototype, "median", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(100, {
        message: 'blur value must be a number between 1-100. eg:10'
    }),
    __metadata("design:type", Number)
], GetOptimizeDto.prototype, "blur", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Equals)('true', {
        message: 'negative value must be true eg:true'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "negative", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Equals)('true', {
        message: 'normalize value must be true eg:true'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "normalize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{1}\,[0-9]{1}\,[0-9]{1,3}$/, {
        message: 'clahe value must be a 3 numbers separated by commas. eg:5,5,5'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "clahe", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,3}$|[0-9]{1,3}\,false$/, {
        message: 'threshold value must be a number between 0-255 or 0-255,false'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "threshold", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}$/, {
        message: 'modulate value must be 3 numbers separated by commas for brightness,saturation,hue. eg:2,2,180'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "modulate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(100, {
        message: 'brightness value must be a number between 1-100. eg:2'
    }),
    __metadata("design:type", Number)
], GetOptimizeDto.prototype, "brightness", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(365, {
        message: 'hue value must be a number between 1-365. eg:180'
    }),
    __metadata("design:type", Number)
], GetOptimizeDto.prototype, "hue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Max)(100, {
        message: 'saturation value must be a number between 1-100. eg:2'
    }),
    __metadata("design:type", Number)
], GetOptimizeDto.prototype, "saturation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Equals)('true', {
        message: ' grayscale value must be true eg:true'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "grayscale", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Equals)('true', {
        message: ' metadata value must be true eg:true'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
        message: 'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
        message: 'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "text2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
        message: 'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "text3", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
        message: 'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "text4", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
        message: 'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "text5", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
        message: 'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "overlay", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
        message: 'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "overlay2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
        message: 'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "overlay3", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
        message: 'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "overlay4", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
        message: 'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
    }),
    __metadata("design:type", String)
], GetOptimizeDto.prototype, "overlay5", void 0);
exports.GetOptimizeDto = GetOptimizeDto;
//# sourceMappingURL=optimize.dto.js.map