import { Request, Response } from 'express';
import { reservationService } from './service';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { PatchReservationDto } from './model';
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
      console.log("here asdasdasd")
      console.dir(req.body, null)
      if (!req.body) return res.status(400).json({ error: 'No data provided' });

      const serviceResponse = await reservationService.updatereservation(req.body.id, req.body);
      handleServiceResponse(serviceResponse, res);
    } catch (e) {
      console.log(e);
    }
  }

  static async apiDeletereservation(req: Request, res: Response) {
    const id = req.params.id;
    const serviceResponse = await reservationService.deletereservation(id);
    handleServiceResponse(serviceResponse, res);
  }
}
