import { Request, Response } from 'express';
import { busService } from './service';
import { BusSchema, CreateBusRequest, CreateBusSchema } from './model';
import { logger } from '@/server';
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

  static async createBus(req: Request, res: Response) {
    try {
      const bus = CreateBusSchema.parse(req.body);
      const serviceResponse = await busService.create(bus);
      res.send(serviceResponse);
    } catch (ex) {
      res.send(`An error has occured ${ex}`);
    }
  }
}
