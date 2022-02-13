import { Response } from 'express';
import sharp from 'sharp';
export declare class OptimizeService {
    optimize(imageId: string, query: any, res: Response): Promise<any>;
    process(sharpObj: sharp.Sharp, query: any): Promise<sharp.Sharp>;
    format(sharpObj: sharp.Sharp, format: string): sharp.Sharp | undefined;
    resize(sharpObj: sharp.Sharp, resize: string): sharp.Sharp;
    crop(sharpObj: sharp.Sharp, crop: string): sharp.Sharp;
    pad(sharpObj: sharp.Sharp, padding: string): sharp.Sharp;
    trim(sharpObj: sharp.Sharp, trim: number): sharp.Sharp;
    rotate(sharpObj: sharp.Sharp, rotate: string): sharp.Sharp;
    flip(sharpObj: sharp.Sharp, flip: string): sharp.Sharp;
    sharpen(sharpObj: sharp.Sharp, sharpen: string): sharp.Sharp;
    median(sharpObj: sharp.Sharp, median: number): Promise<sharp.Sharp>;
    blur(sharpObj: sharp.Sharp, blur: number): sharp.Sharp;
    negative(sharpObj: sharp.Sharp, negative: string): sharp.Sharp;
    normalize(sharpObj: sharp.Sharp, normalize: string): sharp.Sharp;
    clahe(sharpObj: sharp.Sharp, clahe: string): sharp.Sharp;
    threshold(sharpObj: sharp.Sharp, threshold: string): sharp.Sharp;
    modulate(sharpObj: sharp.Sharp, modulate: string): sharp.Sharp;
    brightness(sharpObj: sharp.Sharp, brightness: number): sharp.Sharp;
    hue(sharpObj: sharp.Sharp, hue: number): sharp.Sharp;
    saturation(sharpObj: sharp.Sharp, saturation: number): sharp.Sharp;
    grayscale(sharpObj: sharp.Sharp, grayscale: string): sharp.Sharp;
    text(sharpObj: sharp.Sharp, text: string): Promise<sharp.Sharp>;
    overlay(sharpObj: sharp.Sharp, text: string): Promise<sharp.Sharp>;
    metadata(sharpObj: sharp.Sharp, metadata: string): sharp.Sharp;
}
