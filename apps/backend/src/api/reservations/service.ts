import { StatusCodes } from 'http-status-codes';

import { Reservation } from './model';
import { reservationRepository } from './repository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const reservationService = {
  // Retrieves all reservations from the database
  getAllreservations: async (): Promise<ServiceResponse<Reservation[] | null>> => {
    try {
      const allreservations = await reservationRepository.findAllAsync();
      if (!allreservations) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Reservations found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation[]>(
        ResponseStatus.Success,
        'Reservations found',
        allreservations,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all Reservations: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single reservations by its ID
  getreservationbyId: async (id: number): Promise<ServiceResponse<Reservation | null>> => {
    try {
      const reservation = await reservationRepository.findByIdAsync(id);
      if (!reservation) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation found', reservation, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  createreservation: async (data: Reservation): Promise<ServiceResponse<Reservation | null>> => {
    try {
      const newreservation = {
        ticketnumber: data.ticketnumber,
        price: data.price,
        id_owner: data.id_owner,
        id_bus: data.id_bus,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log(newreservation, 'newreservation');
      const response = await reservationRepository.push(newreservation);
      if (!response) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not Added', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation found', response, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error Creating reservation:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  getreservationbyIdOwner: async (id: number): Promise<ServiceResponse<Reservation | null>> => {
    try {
      const reservation = await reservationRepository.findByOwnerIdAsync(id);
      if (!reservation) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation>(ResponseStatus.Success, 'Reservation found', reservation, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  updatereservation: async (id: string | undefined, data: Reservation): Promise<ServiceResponse<Reservation | null>> => {
    try {
      const updatereservation = await reservationRepository.update(id, data);
      if (!updatereservation) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation>(
        ResponseStatus.Success,
        'Reservation Updated',
        updatereservation,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  deletereservation: async (id: string | undefined): Promise<ServiceResponse<Reservation | null>> => {
    try {
      const reservation = await reservationRepository.delete(id);
      if (!reservation) {
        return new ServiceResponse(ResponseStatus.Failed, 'Reservation not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Reservation>(
        ResponseStatus.Success,
        'Reservation Deleted',
        reservation,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error Deleting Reservation with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
