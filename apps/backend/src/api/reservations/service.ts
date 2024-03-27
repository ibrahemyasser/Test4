import { StatusCodes } from 'http-status-codes';

import { Reservation } from '@/api/reservations/model';
import { reservationRepository } from '@/api/reservations/repository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const reservationService = {
 
   createreservation: async (data:Reservation): Promise<ServiceResponse<Reservation | null >> => {
    try {
            
            const newreservation = {
                id:0,
                ticket_number: data.ticket_number, 
                price: data.price,
                id_owner: data.id_owner, 
                id_trip: data.id_trip,
                id_bus: data.id_bus,
                createdAt: new Date(),

            }
           const response = await  reservationRepository.push(newreservation);
            if (!response) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not Added', null, StatusCodes.NOT_FOUND);
      }
           return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation created', response, StatusCodes.OK);
           } catch (ex) {
             const errorMessage = `Error Creating reservation:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
  },

  
  updatereservation: async (id:number, data: Reservation): Promise<ServiceResponse<Reservation | null>> => {
    try {
         const updatereservation =  await reservationRepository.update(id,data);
        if (!updatereservation) {
          return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
        }
      return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation Updated', updatereservation, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  deletereservation: async (id: number): Promise<ServiceResponse<Reservation | null>> => {
    try{
     const reservation =  await reservationRepository.delete(id);
        if (!reservation) {
          return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
        }
      return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation Deleted', reservation, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error Deleting Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};