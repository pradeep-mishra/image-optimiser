"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const awaitFuncUsed = {
    median: true,
    text: true,
    overlay: true
};
const fitType = {
    fill: 'fill',
    cover: 'cover',
    contain: 'contain',
    inside: 'inside',
    outside: 'outside'
};
async function getFile(imageId) {
    imageId = (0, path_1.join)(__dirname, `../samples/${imageId}`);
    try {
        await (0, promises_1.stat)(imageId);
        return fs_1.default.createReadStream(imageId);
    }
    catch (e) {
        return null;
    }
}
let OptimizeService = class OptimizeService {
    async optimize(imageId, query, res) {
        const imgStream = await getFile(imageId);
        if (!imgStream) {
            return res.status(404).send({ error: 'File not found' });
        }
        if (Object.keys(query).length === 0) {
            return imgStream.pipe(res);
        }
        const sharpObj = (0, sharp_1.default)().on('error', (err) => {
            console.log('unhandled error', err.message);
            res.status(500).json({
                error: err.message
            });
        });
        sharpObj.__compose = [];
        try {
            res.status(200);
            const process = await this.process(sharpObj, query);
            if (sharpObj.__compose && sharpObj.__compose.length > 0) {
                process = sharpObj.composite(sharpObj.__compose);
            }
            imgStream.pipe(process);
            process.pipe(res);
        }
        catch (e) {
            res.status(500);
            res.json({
                error: e.message
            });
        }
    }
    async process(sharpObj, query) {
        let keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            let funcName = keys[i];
            if (keys[i].match(/^text[\d]*$/)) {
                funcName = 'text';
            }
            else if (keys[i].match(/^overlay[\d]*$/)) {
                funcName = 'overlay';
            }
            if (awaitFuncUsed[funcName]) {
                sharpObj = await this[funcName](sharpObj, query[keys[i]]);
            }
            else {
                sharpObj = this[funcName](sharpObj, query[keys[i]]);
            }
        }
        return sharpObj;
    }
    format(sharpObj, format) {
        const formatStr = format.split(',');
        let quality = 100;
        if (formatStr.length === 2) {
            quality = +formatStr[1] > 100 ? 100 : +formatStr[1];
        }
        switch (formatStr[0]) {
            case 'jpg':
            case 'jpeg':
                return sharpObj.jpeg({ quality });
            case 'png':
                return sharpObj.png({ quality });
            case 'webp':
                return sharpObj.webp({ quality });
        }
    }
    resize(sharpObj, resize) {
        try {
            let resolution = resize.split(',');
            if (resolution.length === 1) {
                return sharpObj.resize(+resolution[0]);
            }
            else if (resolution.length === 2) {
                return sharpObj.resize(+resolution[0], +resolution[1]);
            }
            else {
                const fit = resolution[2] && fitType[resolution[2]]
                    ?
                        fitType[resolution[2]]
                    : null;
                if (fit) {
                    return sharpObj.resize(+resolution[0], +resolution[1], { fit });
                }
                return sharpObj.resize(+resolution[0], +resolution[1]);
            }
        }
        catch (e) {
            throw new Error('Invalid value in resize filter, ' + e.message || String(e));
        }
    }
    crop(sharpObj, crop) {
        try {
            let cropStr = crop.split(',');
            return sharpObj.extract({
                left: +cropStr[0],
                top: +cropStr[1],
                width: +cropStr[2],
                height: +cropStr[3]
            });
        }
        catch (e) {
            throw new Error('Invalid value in crop filter, ' + e.message || String(e));
        }
    }
    pad(sharpObj, padding) {
        try {
            let extendStr = padding.split(',');
            let isAlpha = extendStr[4].match(/^([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})$/);
            if (isAlpha) {
                extendStr[4] = {
                    r: +isAlpha[1] > 256 ? 255 : +isAlpha[1],
                    g: +isAlpha[2] > 256 ? 256 : +isAlpha[2],
                    b: +isAlpha[3] > 256 ? 256 : +isAlpha[3],
                    alpha: +isAlpha[4] >= 100 ? 1 : +isAlpha[4] / 100
                };
            }
            else if (extendStr[4].startsWith('@')) {
                extendStr[4] = extendStr[4].replace('@', '#');
            }
            return sharpObj.extend({
                left: +extendStr[0],
                top: +extendStr[1],
                right: +extendStr[2],
                bottom: +extendStr[3],
                background: extendStr[4]
            });
        }
        catch (e) {
            throw new Error('Invalid value in pad filter, ' + e.message || String(e));
        }
    }
    trim(sharpObj, trim) {
        try {
            return sharpObj.trim(trim);
        }
        catch (e) {
            throw new Error('Invalid value in crop filter, ' + e.message || String(e));
        }
    }
    rotate(sharpObj, rotate) {
        try {
            let rotateStr = rotate.split(',');
            rotateStr[0] = +rotateStr[0] > 365 ? 0 : +rotateStr[0];
            rotateStr[1] = rotateStr[1] ?? 'red';
            let isAlpha = rotateStr[1].match(/^([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})$/);
            if (isAlpha) {
                rotateStr[1] = {
                    r: +isAlpha[1] > 256 ? 255 : +isAlpha[1],
                    g: +isAlpha[2] > 256 ? 256 : +isAlpha[2],
                    b: +isAlpha[3] > 256 ? 256 : +isAlpha[3],
                    alpha: +isAlpha[4] > 100 ? 1 : +isAlpha[4] / 100
                };
            }
            else if (rotateStr[1].startsWith('@')) {
                rotateStr[1] = rotateStr[1].replace('@', '#');
            }
            return sharpObj.rotate(rotateStr[0], {
                background: rotateStr[1]
            });
        }
        catch (e) {
            throw new Error('Invalid value in rotate filter, ' + e.message || String(e));
        }
    }
    flip(sharpObj, flip) {
        try {
            if (flip === 'h') {
                return sharpObj.flop();
            }
            else {
                return sharpObj.flip();
            }
        }
        catch (e) {
            throw new Error('Invalid value in flip filter, ' + e.message || String(e));
        }
    }
    sharpen(sharpObj, sharpen) {
        try {
            let sharpenStr = sharpen.split(',');
            if (sharpenStr.length === 1) {
                return sharpObj.sharpen(+sharpenStr[0]);
            }
            else if (sharpenStr.length === 2) {
                return sharpObj.sharpen(+sharpenStr[0], +sharpenStr[1], 0);
            }
            else if (sharpenStr.length === 3) {
                return sharpObj.sharpen(+sharpenStr[0], +sharpenStr[1], +sharpenStr[2]);
            }
            return sharpObj.sharpen();
        }
        catch (e) {
            throw new Error('Invalid value in sharpen filter, ' + e.message || String(e));
        }
    }
    async median(sharpObj, median) {
        try {
            const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
            sharpObj.__metadata = metadata;
            median = median > metadata.width ? metadata.width / 8 : median;
            median = median > metadata.height / 8 ? metadata.height / 8 : median;
            median = Math.floor(median);
            return sharpObj.median(median);
        }
        catch (e) {
            throw new Error('Invalid value in median filter, ' + e.message || String(e));
        }
    }
    blur(sharpObj, blur) {
        try {
            return sharpObj.blur(blur);
        }
        catch (e) {
            throw new Error('Invalid value in blur filter, ' + e.message || String(e));
        }
    }
    negative(sharpObj, negative) {
        try {
            return sharpObj.negate();
        }
        catch (e) {
            throw new Error('Invalid value in negative filter, ' + e.message || String(e));
        }
    }
    normalize(sharpObj, normalize) {
        try {
            return sharpObj.normalize();
        }
        catch (e) {
            throw new Error('Invalid value in normalize filter, ' + e.message || String(e));
        }
    }
    clahe(sharpObj, clahe) {
        try {
            let claheStr = clahe.split(',');
            const maxSlope = +claheStr[2] > 100 ? 100 : +claheStr[2];
            return sharpObj.clahe({
                width: +claheStr[0],
                height: +claheStr[1],
                maxSlope
            });
        }
        catch (e) {
            throw new Error('Invalid value in clahe filter, ' + e.message || String(e));
        }
    }
    threshold(sharpObj, threshold) {
        try {
            let thresholdStr = threshold.split(',');
            thresholdStr[0] = +thresholdStr[0] > 255 ? 255 : +thresholdStr[0];
            const grayscale = thresholdStr[1] && thresholdStr[1] === 'false' ? false : true;
            return sharpObj.threshold(+thresholdStr[0], { grayscale });
        }
        catch (e) {
            throw new Error('Invalid value in threshold filter, ' + e.message || String(e));
        }
    }
    modulate(sharpObj, modulate) {
        try {
            let modulateStr = modulate.split(',');
            modulateStr[0] = +modulateStr[0] > 100 ? 100 : +modulateStr[0];
            modulateStr[1] = +modulateStr[1] > 100 ? 100 : +modulateStr[1];
            modulateStr[2] = +modulateStr[2] >= 365 ? 0 : +modulateStr[2];
            let opts = {};
            if (modulateStr[0] > 0) {
                opts.brightness = modulateStr[0];
            }
            if (modulateStr[1] > 0) {
                opts.saturation = modulateStr[1];
            }
            if (modulateStr[2] > 0) {
                opts.hue = modulateStr[2];
            }
            return sharpObj.modulate(opts);
        }
        catch (e) {
            throw new Error('Invalid value in modulate filter, ' + e.message || String(e));
        }
    }
    brightness(sharpObj, brightness) {
        try {
            return sharpObj.modulate({
                brightness
            });
        }
        catch (e) {
            throw new Error('Invalid value in brightness filter, ' + e.message || String(e));
        }
    }
    hue(sharpObj, hue) {
        try {
            return sharpObj.modulate({
                hue
            });
        }
        catch (e) {
            throw new Error('Invalid value in hue filter, ' + e.message || String(e));
        }
    }
    saturation(sharpObj, saturation) {
        try {
            return sharpObj.modulate({
                saturation
            });
        }
        catch (e) {
            throw new Error('Invalid value in saturation filter, ' + e.message || String(e));
        }
    }
    grayscale(sharpObj, grayscale) {
        try {
            return sharpObj.grayscale();
        }
        catch (e) {
            throw new Error('Invalid value in grayscale filter, ' + e.message || String(e));
        }
    }
    async text(sharpObj, text) {
        try {
            let textMatch = text.match(/^([0-9]{1,2})\,([0-9]{1,2})\,([0-9]{1,2})\,([\w]+)\,([\w]+)\,([\w\W]+)$/m);
            const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
            sharpObj.__metadata = metadata;
            if (textMatch[4].startsWith('@')) {
                textMatch[4] = textMatch[4].replace('@', '#');
            }
            const svgImage = `
        <svg width="${metadata.width}" height="${metadata.height}">
          <style>
            .title { 
              fill: ${textMatch[4]}; 
              font-size: ${textMatch[3]}px; 
              font-weight: ${textMatch[5]};
              font-family: Inter, sans-serif;
            }
          </style>
          <text 
            x="${textMatch[1]}%" 
            y="${textMatch[2]}%" 
            text-anchor="middle" 
            class="title">
              ${textMatch[6]}
          </text>
        </svg>
      `;
            const svgBuffer = Buffer.from(svgImage);
            sharpObj.__compose.push({
                input: svgBuffer,
                top: 0,
                left: 0
            });
            return sharpObj;
        }
        catch (e) {
            throw new Error('Invalid value in text filter, ' + e.message || String(e));
        }
    }
    async overlay(sharpObj, text) {
        try {
            let textMatch = text.match(/^([0-9]{1,2})\,([0-9]{1,2})\,([\w\W]+)$/m);
            if (textMatch[3] === 'overlay.png') {
                textMatch[3] = (0, path_1.join)(__dirname, `../samples/${textMatch[3]}`);
            }
            const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
            sharpObj.__metadata = metadata;
            const imgBuffer = await (0, sharp_1.default)(textMatch[3]).toBuffer();
            sharpObj.__compose.push({
                input: imgBuffer,
                top: Math.floor((metadata.height / 100) * +textMatch[2]),
                left: Math.floor((metadata.width / 100) * +textMatch[1])
            });
            return sharpObj;
        }
        catch (e) {
            throw new Error('Invalid value in overlay filter, ' + e.message || String(e));
        }
    }
    metadata(sharpObj, metadata) {
        try {
            return sharpObj.withMetadata();
        }
        catch (e) {
            throw new Error('Invalid value in metadata filter, ' + e.message || String(e));
        }
    }
};
OptimizeService = __decorate([
    (0, common_1.Injectable)()
], OptimizeService);
exports.OptimizeService = OptimizeService;
//# sourceMappingURL=optimize.service.js.map