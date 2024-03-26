
import { Bus } from '@/api/bus/model';

export const buses: Bus[] = [
    { id: 1, name: 'Bus 1 Matrouh-Delta', areaNumber: 1, createdAt: new Date(), updatedAt: new Date() },

    { id: 2, name: 'Bus 2 Matrouh-Delta', areaNumber: 2, createdAt: new Date(), updatedAt: new Date() },

    { id: 3, name: 'Bus 3 Matrouh-Delta', areaNumber: 3, createdAt: new Date(), updatedAt: new Date()},
];

export const busRepository = {
  findAllAsync: async (): Promise<Bus[]> => {
    return buses;
  },
};
