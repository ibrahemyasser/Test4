import { Request, Response } from 'express';
import { busService } from './service';
import {  CreateBusSchema, PatchBusDto } from './model';
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

  static async deleteBus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const serviceResponse = await busService.delete(id);
      res.send(serviceResponse);
    } catch (ex) {
      res.send(`An error has occured ${ex}`);
    }
  }

  static async patchBus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const bus = PatchBusDto.parse(req.body);
      const serviceResponse = await busService.patch(id, bus);
      res.send(serviceResponse);
    } catch (ex) {
      res.send(`An error has occured ${ex}`);
    }
  }
  static async addReservationToBus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const resId = req.body.reservationId;
      const serviceResponse = await busService.addReservationToBus(id, resId);
      res.send(serviceResponse);
    } catch (ex) {
      res.send(`An error has occured ${ex}`);
    }
  }
  static async removeReservationFromBus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const resId = req.body.reservationId;
      const serviceResponse = await busService.removeReservationFromBus(id, resId);
      res.send(serviceResponse);
    } catch (ex) {
      res.send(`An error has occured ${ex}`);
    }
  }
}
