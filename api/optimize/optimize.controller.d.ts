import { Response } from 'express';
import { GetOptimizeDto } from './dto/optimize.dto';
import { OptimizeService } from './optimize.service';
export declare class OptimizeController {
    private readonly optimizeService;
    constructor(optimizeService: OptimizeService);
    optimize(imageId: string, query: GetOptimizeDto, res: Response): Promise<any>;
}
