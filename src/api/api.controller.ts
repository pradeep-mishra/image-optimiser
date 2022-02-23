import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiService } from './api.service'
import { GetApiDto } from './dto/api.dto'

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get(':id')
  Api(
    @Param('id') imageId: string,
    @Query() query: GetApiDto,
    @Res() res: Response
  ) {
    return this.apiService.optimize(imageId, query, res)
  }
}
