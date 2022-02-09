import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import stream from 'stream';
import util from 'util';
const pipeline = util.promisify(stream.pipeline);

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

function getFile(imageId:string) : any {
  imageId = join(__dirname, `../samples/${imageId}.jpg`);
  return fs.createReadStream(imageId);
}

@Injectable()
export class OptimizeService {
  async optimize(imageId: string, query: any, res: Response) {
    // update this getFlie function to get the file from diff source
    const imgStream = getFile(imageId)

    if (Object.keys(query).length === 0) {
      return imgStream.pipe(res);
    } 
    const sharpObj = sharp().on('error', (err: any) => {
      console.log('unhandled error', err.message);
      res.status(500).json({
        error: err.message
      });
    });

    //@ts-ignore
    sharpObj.__compose = [];
    try {
      res.status(200);
      const process = await this.process(sharpObj, query);
      //@ts-ignore
      if (sharpObj.__compose && sharpObj.__compose.length > 0) {
        //@ts-ignore
        process = sharpObj.composite(sharpObj.__compose);
      }
      imgStream.pipe(process);
      process.pipe(res);
    } catch (e: any) {
      res.status(500);
      res.json({
        error: e.message
      });
    }
  }

  async process(sharpObj: sharp.Sharp, query: any) {
    //console.log('query', query);
    let keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
      //@ts-ignore
      console.log(keys[i]);
      let funcName = keys[i];
      if (keys[i].match(/^text[\d]*$/)) {
        funcName = 'text';
      } else if (keys[i].match(/^overlay[\d]*$/)) {
        funcName = 'overlay';
      }
      //@ts-ignore
      if (awaitFuncUsed[funcName]) {
        //@ts-ignore
        sharpObj = await this[funcName](sharpObj, query[keys[i]]);
      } else {
        //@ts-ignore
        sharpObj = this[funcName](sharpObj, query[keys[i]]);
      }
    }
    return sharpObj;
  }

  format(sharpObj: sharp.Sharp, format: string) {
    console.log('calling format', format);
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

  resize(sharpObj: sharp.Sharp, resize: string) {
    console.log('calling resize', resize);
    try {
      let resolution = resize.split(',');
      if (resolution.length === 1) {
        console.log(+resolution[0]);
        return sharpObj.resize(+resolution[0]);
      } else if (resolution.length === 2) {
        console.log(+resolution[0], +resolution[1]);
        return sharpObj.resize(+resolution[0], +resolution[1]);
      } else {
        //@ts-ignore
        const fit =
          //@ts-ignore
          resolution[2] && fitType[resolution[2]]
            ? //@ts-ignore
              fitType[resolution[2]]
            : null;
        if (fit) {
          console.log(+resolution[0], +resolution[1], { fit });
          return sharpObj.resize(+resolution[0], +resolution[1], { fit });
        }
        console.log(+resolution[0], +resolution[1]);
        return sharpObj.resize(+resolution[0], +resolution[1]);
      }
    } catch (e: any) {
      throw new Error(
        'Invalid value in resize modifier, ' + e.message || String(e)
      );
    }
  }

  crop(sharpObj: sharp.Sharp, crop: string) {
    console.log('calling crop', crop);
    try {
      let cropStr = crop.split(',');
      return sharpObj.extract({
        left: +cropStr[0],
        top: +cropStr[1],
        width: +cropStr[2],
        height: +cropStr[3]
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in crop modifier, ' + e.message || String(e)
      );
    }
  }

  pad(sharpObj: sharp.Sharp, padding: string) {
    console.log('calling padding', padding);
    try {
      let extendStr = padding.split(',');
      let isAlpha = extendStr[4].match(
        /^([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})$/
      );
      if (isAlpha) {
        //@ts-ignore
        extendStr[4] = {
          r: +isAlpha[1] > 256 ? 255 : +isAlpha[1],
          g: +isAlpha[2] > 256 ? 256 : +isAlpha[2],
          b: +isAlpha[3] > 256 ? 256 : +isAlpha[3],
          alpha: +isAlpha[4] > 100 ? 1 : +isAlpha[4] / 100
        };
      } else if (extendStr[4].startsWith('@')) {
        extendStr[4] = extendStr[4].replace('@', '#');
      }
      return sharpObj.extend({
        top: +extendStr[0],
        right: +extendStr[1],
        bottom: +extendStr[2],
        left: +extendStr[3],
        background: extendStr[4]
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in pad modifier, ' + e.message || String(e)
      );
    }
  }

  trim(sharpObj: sharp.Sharp, trim: number) {
    console.log('calling trim', trim);
    try {
      return sharpObj.trim(trim);
    } catch (e: any) {
      throw new Error(
        'Invalid value in crop modifier, ' + e.message || String(e)
      );
    }
  }

  rotate(sharpObj: sharp.Sharp, rotate: string) {
    console.log('calling rotate', rotate);
    try {
      let rotateStr = rotate.split(',');
      //@ts-ignore
      rotateStr[0] = +rotateStr[0] > 365 ? 0 : +rotateStr[0];
      rotateStr[1] = rotateStr[1] ?? 'red';
      let isAlpha = rotateStr[1].match(
        /^([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})\:([0-9]{1,3})$/
      );
      if (isAlpha) {
        //@ts-ignore
        rotateStr[1] = {
          r: +isAlpha[1] > 256 ? 255 : +isAlpha[1],
          g: +isAlpha[2] > 256 ? 256 : +isAlpha[2],
          b: +isAlpha[3] > 256 ? 256 : +isAlpha[3],
          alpha: +isAlpha[4] > 100 ? 1 : +isAlpha[4] / 100
        };
      } else if (rotateStr[1].startsWith('@')) {
        rotateStr[1] = rotateStr[1].replace('@', '#');
      }
      //@ts-ignore
      return sharpObj.rotate(rotateStr[0], {
        background: rotateStr[1]
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in rotate modifier, ' + e.message || String(e)
      );
    }
  }
  flip(sharpObj: sharp.Sharp, flip: string) {
    console.log('calling flip', flip);
    try {
      if (flip === 'h') {
        return sharpObj.flop();
      } else {
        return sharpObj.flip();
      }
    } catch (e: any) {
      throw new Error(
        'Invalid value in flip modifier, ' + e.message || String(e)
      );
    }
  }

  sharpen(sharpObj: sharp.Sharp, sharpen: string) {
    console.log('calling sharpen', sharpen);
    try {
      let sharpenStr = sharpen.split(',');
      if (sharpenStr.length === 1) {
        return sharpObj.sharpen(+sharpenStr[0]);
      } else if (sharpenStr.length === 2) {
        return sharpObj.sharpen(+sharpenStr[0], +sharpenStr[1], 0);
      } else if (sharpenStr.length === 3) {
        return sharpObj.sharpen(+sharpenStr[0], +sharpenStr[1], +sharpenStr[2]);
      }
      return sharpObj.sharpen();
    } catch (e: any) {
      throw new Error(
        'Invalid value in sharpen modifier, ' + e.message || String(e)
      );
    }
  }

  async median(sharpObj: sharp.Sharp, median: number) {
    console.log('calling median', median);
    try {
      //@ts-ignore
      const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
      //@ts-ignore
      sharpObj.__metadata = metadata;

      //@ts-ignore
      median = median > metadata.width ? metadata.width / 8 : median;
      //@ts-ignore
      median = median > metadata.height / 8 ? metadata.height / 8 : median;
      median = Math.floor(median);
      return sharpObj.median(median);
    } catch (e: any) {
      throw new Error(
        'Invalid value in median modifier, ' + e.message || String(e)
      );
    }
  }

  blur(sharpObj: sharp.Sharp, blur: number) {
    console.log('calling blur', blur);
    try {
      console.log('blur', blur);
      return sharpObj.blur(blur);
    } catch (e: any) {
      throw new Error(
        'Invalid value in blur modifier, ' + e.message || String(e)
      );
    }
  }

  negative(sharpObj: sharp.Sharp, negative: string) {
    console.log('calling negative', negative);
    try {
      return sharpObj.negate();
    } catch (e: any) {
      throw new Error(
        'Invalid value in negative modifier, ' + e.message || String(e)
      );
    }
  }

  normalize(sharpObj: sharp.Sharp, normalize: string) {
    console.log('calling  normalize', normalize);
    try {
      return sharpObj.normalize();
    } catch (e: any) {
      throw new Error(
        'Invalid value in normalize modifier, ' + e.message || String(e)
      );
    }
  }

  clahe(sharpObj: sharp.Sharp, clahe: string) {
    console.log('calling clahe', clahe);
    try {
      let claheStr = clahe.split(',');
      const maxSlope = +claheStr[2] > 100 ? 100 : +claheStr[2];
      return sharpObj.clahe({
        width: +claheStr[0],
        height: +claheStr[1],
        maxSlope
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in clahe modifier, ' + e.message || String(e)
      );
    }
  }
  threshold(sharpObj: sharp.Sharp, threshold: string) {
    console.log('calling threshold', threshold);
    try {
      let thresholdStr = threshold.split(',');
      //@ts-ignore
      thresholdStr[0] = +thresholdStr[0] > 255 ? 255 : +thresholdStr[0];
      const grayscale =
        thresholdStr[1] && thresholdStr[1] === 'false' ? false : true;
      return sharpObj.threshold(+thresholdStr[0], { grayscale });
    } catch (e: any) {
      throw new Error(
        'Invalid value in threshold modifier, ' + e.message || String(e)
      );
    }
  }

  modulate(sharpObj: sharp.Sharp, modulate: string) {
    console.log('calling modulate', modulate);
    try {
      let modulateStr = modulate.split(',');
      //@ts-ignore
      modulateStr[0] = +modulateStr[0] > 100 ? 100 : +modulateStr[0];
      //@ts-ignore
      modulateStr[1] = +modulateStr[1] > 100 ? 100 : +modulateStr[1];
      //@ts-ignore
      modulateStr[2] = +modulateStr[2] >= 365 ? 0 : +modulateStr[2];

      let opts = {};
      //@ts-ignore
      if (modulateStr[0] > 0) {
        //@ts-ignore
        opts.brightness = modulateStr[0];
      }
      //@ts-ignore
      if (modulateStr[1] > 0) {
        //@ts-ignore
        opts.saturation = modulateStr[1];
      }
      //@ts-ignore
      if (modulateStr[2] > 0) {
        //@ts-ignore
        opts.hue = modulateStr[2];
      }
      return sharpObj.modulate(opts);
    } catch (e: any) {
      throw new Error(
        'Invalid value in modulate modifier, ' + e.message || String(e)
      );
    }
  }

  brightness(sharpObj: sharp.Sharp, brightness: number) {
    console.log('calling brightness', brightness);
    try {
      return sharpObj.modulate({
        brightness
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in brightness modifier, ' + e.message || String(e)
      );
    }
  }

  hue(sharpObj: sharp.Sharp, hue: number) {
    console.log('calling hue', hue);
    try {
      return sharpObj.modulate({
        hue
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in hue modifier, ' + e.message || String(e)
      );
    }
  }

  saturation(sharpObj: sharp.Sharp, saturation: number) {
    console.log('calling brightness', saturation);
    try {
      return sharpObj.modulate({
        saturation
      });
    } catch (e: any) {
      throw new Error(
        'Invalid value in saturation modifier, ' + e.message || String(e)
      );
    }
  }

  grayscale(sharpObj: sharp.Sharp, grayscale: string) {
    console.log('calling  normalize', grayscale);
    try {
      return sharpObj.grayscale();
    } catch (e: any) {
      throw new Error(
        'Invalid value in grayscale modifier, ' + e.message || String(e)
      );
    }
  }

  async text(sharpObj: sharp.Sharp, text: string) {
    console.log('calling text', text);
    try {
      let textMatch: Array<any> = text.match(
        /^([0-9]{1,2})\,([0-9]{1,2})\,([0-9]{1,2})\,([\w]+)\,([\w]+)\,([\w\W]+)$/m
      )!;

      //@ts-ignore
      const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
      //@ts-ignore
      sharpObj.__metadata = metadata;

      //console.log('textMatch', textMatch);

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
              border:1px solid blue;
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
      //console.log('svgImage', svgImage);
      const svgBuffer = Buffer.from(svgImage);
      //@ts-ignore
      sharpObj.__compose.push({
        input: svgBuffer,
        top: 0,
        left: 0
      });
      return sharpObj;
    } catch (e: any) {
      throw new Error(
        'Invalid value in text modifier, ' + e.message || String(e)
      );
    }
  }

  async overlay(sharpObj: sharp.Sharp, text: string) {
    console.log('calling overlay', text);
    try {
      let textMatch: Array<any> = text.match(
        /^([0-9]{1,2})\,([0-9]{1,2})\,([\w\W]+)$/m
      )!;

      if (textMatch[3] === 'nkm') {
        textMatch[3] = join(__dirname, `../sample/${textMatch[3]}.png`);
      }

      //console.log('textMatch', textMatch);

      //@ts-ignore
      const metadata = sharpObj.__metadata ?? (await sharpObj.metadata());
      //@ts-ignore
      sharpObj.__metadata = metadata;

      const imgBuffer = await sharp(textMatch[3]).toBuffer();

      //@ts-ignore
      sharpObj.__compose.push({
        input: imgBuffer,
        top: Math.floor((metadata.height / 100) * +textMatch[2]),
        left: Math.floor((metadata.width / 100) * +textMatch[1])
      });
      return sharpObj;
    } catch (e: any) {
      throw new Error(
        'Invalid value in overlay modifier, ' + e.message || String(e)
      );
    }
  }

  metadata(sharpObj: sharp.Sharp, metadata: string) {
    console.log('calling  normalize', metadata);
    try {
      return sharpObj.withMetadata();
    } catch (e: any) {
      throw new Error(
        'Invalid value in grayscale modifier, ' + e.message || String(e)
      );
    }
  }
}
