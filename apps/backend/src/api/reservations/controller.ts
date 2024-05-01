import { Request, Response } from 'express';
import { reservationService } from './service';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
export class ReservationController {
  static async apiGetAllreservations(req: Request, res: Response) {
    const serviceResponse = await reservationService.getAllreservations();
    handleServiceResponse(serviceResponse, res);
  }

  static async apiGetreservationById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await reservationService.getreservationbyId(id);
    handleServiceResponse(serviceResponse, res);
  }
  static async apiGetreservationByIdOwner(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await reservationService.getreservationbyIdOwner(id);
    handleServiceResponse(serviceResponse, res);
  }

  static async apiCreatereservation(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ error: 'No data provided' });
    const serviceResponse = await reservationService.createreservation(req.body);
    handleServiceResponse(serviceResponse, res);
  }

  static async apiUpdatereservation(req: Request, res: Response) {
    try {
      if (!req.body) return res.status(400).json({ error: 'No data provided' });
      const id = parseInt(req.body.id as string, 10);
      console.log(req.body.data, 'dataaaaaaaaa');
      const serviceResponse = await reservationService.updatereservation(id, req.body.data);
      handleServiceResponse(serviceResponse, res);
    } catch (e) {
      console.log(e);
    }
  }

  static async apiDeletereservation(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await reservationService.deletereservation(id);
    console.log(serviceResponse, 'serviceResponse');
    handleServiceResponse(serviceResponse, res);
  }
}
