
import { StatusCodes } from 'http-status-codes';

import { Bus } from '@/api/bus/model';
import { userRepository } from '@/api/user/repository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
import { busRepository } from '@/api/bus/repository';

export const userService = {
  // Retrieves all users from the database
  findAll: async (): Promise<Bus[] | string> => {
    try {
      const buses = await busRepository.findAllAsync();
      if (!buses) {
        return "No Users found";
      }
      return buses;
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return "Internal Server Error"; ;
    }
  },
  
};
