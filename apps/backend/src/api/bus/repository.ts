import { Bus, BusModel, CreateBusDto } from '@/api/bus/model';

export const busRepository = {
  findAllAsync: async (): Promise<Bus[]> => {
    return BusModel.find().exec();
  },

  findByIdAsync: async (id: number) => {
    return BusModel.findById(id).exec();
  },

  createAsync: async (bus: CreateBusDto) => {
    return BusModel.create(bus);
  },
  deleteAsync: async (id: number) => {
    return BusModel.findByIdAndDelete(id).exec();
  },

  patchAsync: async (id: number, bus: Partial<Bus>) => {
    return BusModel.findByIdAndUpdate(id, bus, { new: true }).exec();
  },

  addReservationAsync: async (id: number, reservationId: number) => {
    return BusModel.findByIdAndUpdate(id, { $push: { reservations: reservationId } }, { new: true }).exec();
  },

  removeReservationAsync: async (id: number, reservationId: number) => {
    return BusModel.findByIdAndUpdate(id, { $pull: { reservations: reservationId } }, { new: true }).exec();
  },
  findReservationsOfBusAsync: async (id: number) => {
    return BusModel.findById(id).populate('reservations').exec();
  },
};
