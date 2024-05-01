import { Reservation } from '@/api/reservations/model';

export const reservations: Reservation[] = [
  { id: 1, ticket_number: 1, price: 50, id_owner: 2, id_trip: 42, id_bus: 5, createdAt: new Date() },
  { id: 2, ticket_number: 2, price: 20, id_owner: 5, id_trip: 40, id_bus: 3, createdAt: new Date() },
];

export const reservationRepository = {
  findAllAsync: async (): Promise<Reservation[]> => {
    return reservations;
  },

  findByIdAsync: async (id: number): Promise<Reservation | null> => {
    return reservations.find((reservations) => reservations.id === id) || null;
  },

  findByOwnerIdAsync: async (id: number): Promise<Reservation | null> => {
    return reservations.find((reservations) => reservations.id_owner === id) || null;
  },

  update: async (id: number, data: Reservation): Promise<Reservation | undefined> => {
    const index = reservations.findIndex((reservation) => reservation.id === id);
    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...data, id: id };
      return reservations[index];
    }
    return undefined;
  },

  push: async (data: Reservation): Promise<Reservation | null> => {
    const newData = { ...data, id: reservations.length + 1 };
    console.log(newData);
    reservations.push(newData);
    return newData;
  },

  delete: async (id: number): Promise<Reservation | null> => {
    const index = reservations.findIndex((reservation) => reservation.id === id);
    if (index !== -1) {
      const deletedReservation = reservations.splice(index, 1)[0];
      return deletedReservation ? deletedReservation : null;
    }
    console.log(reservations);
    return null;
  },
};
