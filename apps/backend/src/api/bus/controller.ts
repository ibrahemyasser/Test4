
import  { Request, Response } from 'express';
import { busService } from './service';
export class BusController {
    static async getBus(req: Request, res: Response) {
        const serviceResponse = await busService.findAll();
        res.send(serviceResponse);
    }
    static async getBusById(req: Request, res: Response) {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await busService.findById(id);
        res.send(serviceResponse);
    }
    
}