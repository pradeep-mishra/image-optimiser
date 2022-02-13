import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetOptimizeDto } from './dto/optimize.dto';
import { OptimizeService } from './optimize.service';

@Controller('api')
export class OptimizeController {
  constructor(private readonly optimizeService: OptimizeService) {}

  @Get(':id')
  optimize(
    @Param('id') imageId: string,
    @Query() query: GetOptimizeDto,
    @Res() res: Response
  ) {
    return this.optimizeService.optimize(imageId, query, res);
  }
}
