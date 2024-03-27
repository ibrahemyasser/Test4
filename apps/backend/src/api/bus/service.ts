import { Bus, CreateBusDto } from '@/api/bus/model';
import { userRepository } from '@/api/user/repository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
import { busRepository } from '@/api/bus/repository';

export const busService = {
  findAll: async (): Promise<Bus[] | string> => {
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

  findById: async (id: number): Promise<Bus | string> => {
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

  create: async (bus: CreateBusDto): Promise<Bus | string> => {
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

  delete: async (id: number): Promise<Bus | undefined> => {
    return await busRepository.deleteAsync(id);
  },

  patch: async (id: number, bus: Partial<Bus>): Promise<Bus | undefined> => {
    return await busRepository.patchAsync(id, bus);
  },
};
