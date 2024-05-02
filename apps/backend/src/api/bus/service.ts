import { Bus, CreateBusDto } from '@/api/bus/model';
import { logger } from '@/server';
import { busRepository } from '@/api/bus/repository';

export const busService = {
  findAll: async () => {
    try {
      const buses = await busRepository.findAllAsync();
      if (!buses) {
        return 'No buses found';
      }
      return buses;
    } catch (ex) {
      const errorMessage = `Error finding all buses: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return 'Internal Server Error';
    }
  },
  addReservationToBus: async (busId: string | undefined, resId: string) => {
    try {
      const bus = await busRepository.addReservationAsync(busId, resId);
      if (!bus) {
        return 'Bus with that ID does not exist';
      }
      return bus;
    } catch (ex) {
      const errorMessage = `Error adding reservation to bus: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return 'Internal Server Error';
    }
  },
  removeReservationFromBus: async (busId: string | undefined, resId: string) => {
    try {
      const bus = await busRepository.removeReservationAsync(busId, resId);
      if (!bus) {
        return 'Bus with that ID does not exist';
      }
      return bus;
    } catch (ex) {
      const errorMessage = `Error removing reservation from bus: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return 'Internal Server Error';
    }
  },
  findById: async (id: string | undefined) => {
    try {
      const bus = await busRepository.findByIdAsync(id);
      if (!bus) {
        return "Bus with that ID doesn't exist";
      }
      return bus;
    } catch (ex) {
      const errorMessage = `Error finding all buses: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return 'Internal Server Error';
    }
  },

  create: async (bus: CreateBusDto) => {
    try {
      const newBus = await busRepository.createAsync(bus);
      if (newBus) {
        return newBus;
      } else {
        return 'An Error has occured!';
      }
    } catch (ex) {
      const errorMessage = `Error creating bus: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return `An Error has occured! + ${ex}`;
    }
  },

  delete: async (id: string | undefined) => {
    return await busRepository.deleteAsync(id);
  },

  patch: async (id: string | undefined, bus: Partial<Bus>) => {
    return await busRepository.patchAsync(id, bus);
  },
};
