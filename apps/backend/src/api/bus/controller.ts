
import  { Request, Response } from 'express';
import { busService } from './service';
export class BusController {
    static async getBus(req: Request, res: Response) {
        const serviceResponse = await busService.findAll();
        res.send(serviceResponse);
    }
    
}