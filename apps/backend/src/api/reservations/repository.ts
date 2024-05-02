import { CreateReservationDto, Reservation, ReservationModel } from './model';



export const reservationRepository = {
  findAllAsync: async (): Promise<Reservation[]> => {
    return ReservationModel.find().exec();
  },

  findByIdAsync: async (id: number): Promise<Reservation | null> => {
    return ReservationModel.findById(id).exec();
  },

  findByOwnerIdAsync: async (id: number): Promise<Reservation | null> => {
    return ReservationModel.findOne({ id_owner: id }, (err:string, result:Promise<Reservation | null>) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
}).exec();
  },

  update: async (id: number, data: Reservation) => {
   return ReservationModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  push: async (data: CreateReservationDto): Promise<Reservation | null> => {
   return ReservationModel.create(data);
  },

  delete: async (id: number): Promise<Reservation | null> => {
   return  ReservationModel.findByIdAndDelete(id).exec();
  },
};
