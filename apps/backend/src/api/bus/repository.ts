import { Bus, BusModel, CreateBusDto } from '@/api/bus/model';

export const busRepository = {
  findAllAsync: async (): Promise<Bus[]> => {
    return BusModel.find().exec();
  },

  findByIdAsync: async (id: string | undefined) => {
    return BusModel.findById(id).exec();
  },

  createAsync: async (bus: CreateBusDto) => {
    return BusModel.create(bus);
  },
  deleteAsync: async (id: string | undefined) => {
    return BusModel.findByIdAndDelete(id).exec();
  },

  patchAsync: async (id: string | undefined, bus: Partial<Bus>) => {
    return BusModel.findByIdAndUpdate(id, bus, { new: true }).exec();
  },

  addReservationAsync: async (id: string | undefined, reservationId: string| undefined) => {
    console.log('id', id);
    return BusModel.findByIdAndUpdate(id, { $push: { reservations: reservationId } }, { new: true }).exec();
  },

  removeReservationAsync: async (id: string | undefined, reservationId: string| undefined) => {
    return BusModel.findByIdAndUpdate(id, { $pull: { reservations: reservationId } }, { new: true }).exec();
  },
  findReservationsOfBusAsync: async (id: string | undefined) => {
    return BusModel.findById(id).populate('reservations').exec();
  },
};
