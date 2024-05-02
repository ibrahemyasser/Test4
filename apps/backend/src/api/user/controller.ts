import  { Request, Response } from 'express';
import { userService } from './service';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
export class UserController {
    static async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id as string, 10);
        const serviceResponse = await userService.findById(id);
        handleServiceResponse(serviceResponse, res);
    }
    static async createUser(req: Request, res: Response) {
        const serviceResponse = await userService.create(req.body);
        handleServiceResponse(serviceResponse, res);
    }
}