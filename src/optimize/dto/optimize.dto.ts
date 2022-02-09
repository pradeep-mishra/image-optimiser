import { Type } from 'class-transformer';
import {
  Equals,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Max
} from 'class-validator';

enum Flip {
  horizontal = 'h',
  vertical = 'v'
}

export class GetOptimizeDto {
  @IsOptional()
  @Matches(
    /^[0-9]{1,4}$|^[0-9]{1,4}\,[0-9]{1,4}$|^[0-9]{1,4}\,[0-9]{1,4}\,[a-z]{1,10}$/,
    {
      message:
        'resize value must have format: width or width,height or width,height,fitType'
    }
  )
  resize: string;

  @IsOptional()
  @Matches(
    /^jpg\,?[0-9]{0,3}$|^jpeg\,?[0-9]{0,3}$|^png\,?[0-9]{0,3}$|^webp\,?[0-9]{0,3}$/,
    {
      message:
        'format value must be jpg, jpeg, png, webp with a quality number 1-100. eg: jpeg,100'
    }
  )
  format: string;

  @IsOptional()
  @Matches(/^[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}$/, {
    message: 'crop value must be 4 numbers separated by commas. eg:5,5,5,5'
  })
  crop: string;

  @IsOptional()
  @Matches(/^[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[0-9]{1,4}\,[^\,]+$/, {
    message:
      'pad value must be 4 numbers followed by color value separated by commas. eg:5,5,5,5,red'
  })
  pad: string;

  @IsOptional()
  @Type(() => Number)
  @Max(1000, {
    message: 'trim value must be a number greater than 0. eg:10'
  })
  trim: string;

  @IsOptional()
  @Matches(/^[0-9]{1,3}$|^[0-9]{1,3}\,[^\,]{1,20}$/, {
    message:
      'rotate value must be the number of degrees to rotate the image and the background color separated by commas. eg:90 or 90,red'
  })
  rotate: string;

  @IsOptional()
  @IsString()
  @IsEnum(Flip, {
    message: 'flip value must be h for horizontal or v for vertical'
  })
  flip: Flip;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9\.]{1,3}$|^[0-9\.]{1,3}\,[0-9\.]{1,3}\,[0-9\.]{1,3}$/, {
    message:
      'sharpen value must be a 1 or 3 numbers separated by commas. eg:6 or 1.5, 0.5, 2.5'
  })
  sharpen: string;

  @IsOptional()
  @Type(() => Number)
  @Max(1000, {
    message:
      'median value must be a number greater than 0 and less than 1/8th of image height or width. eg:10'
  })
  median: number;

  @IsOptional()
  @Type(() => Number)
  @Max(100, {
    message: 'blur value must be a number between 1-100. eg:10'
  })
  blur: number;

  @IsOptional()
  @IsString()
  @Equals('true', {
    message: 'negative value must be true eg:true'
  })
  negative: string;

  @IsOptional()
  @IsString()
  @Equals('true', {
    message: 'normalize value must be true eg:true'
  })
  normalize: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1}\,[0-9]{1}\,[0-9]{1,3}$/, {
    message: 'clahe value must be a 3 numbers separated by commas. eg:5,5,5'
  })
  clahe: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,3}$|[0-9]{1,3}\,false$/, {
    message: 'threshold value must be a number between 0-255 or 0-255,false'
  })
  threshold: string;

  @IsOptional()
  @Matches(/^[0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}$/, {
    message:
      'modulate value must be 3 numbers separated by commas for brightness,saturation,hue. eg:2,2,180'
  })
  modulate: string;

  @IsOptional()
  @Type(() => Number)
  @Max(100, {
    message: 'brightness value must be a number between 1-100. eg:2'
  })
  brightness: number;

  @IsOptional()
  @Type(() => Number)
  @Max(365, {
    message: 'hue value must be a number between 1-365. eg:180'
  })
  hue: number;

  @IsOptional()
  @Type(() => Number)
  @Max(100, {
    message: 'saturation value must be a number between 1-100. eg:2'
  })
  saturation: number;

  @IsOptional()
  @IsString()
  @Equals('true', {
    message: ' grayscale value must be true eg:true'
  })
  grayscale: string;

  @IsOptional()
  @IsString()
  @Equals('true', {
    message: ' metadata value must be true eg:true'
  })
  metadata: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
    message:
      'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
  })
  text: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
    message:
      'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
  })
  text2: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
    message:
      'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
  })
  text3: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
    message:
      'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
  })
  text4: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[0-9]{1,3}\,[\w]+\,[\w]+\,[\w\W]+$/m, {
    message:
      'crop value must include 6 values separated by commas for x_pos_%,y_pos_%,font_size_px,font_color,font_weight,text. eg:50,50,70,red,bold,Hello World'
  })
  text5: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
    message:
      'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
  })
  overlay: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
    message:
      'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
  })
  overlay2: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
    message:
      'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
  })
  overlay3: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
    message:
      'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
  })
  overlay4: string;

  @IsOptional()
  @Matches(/^[0-9]{1,2}\,[0-9]{1,2}\,[\w\W]+$/m, {
    message:
      'overlay value must include 3 values separated by commas for x_pos_%,y_pos_%,image_id. eg:50,50,logo.png'
  })
  overlay5: string;
}
