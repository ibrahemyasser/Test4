import { Bus, CreateBusDto } from '@/api/bus/model';

export const buses: Bus[] = [
  { id: 1, name: 'Bus 1 Matrouh-Delta', areaNumber: 1, createdAt: new Date(), updatedAt: new Date() },

  { id: 2, name: 'Bus 2 Matrouh-Delta', areaNumber: 2, createdAt: new Date(), updatedAt: new Date() },

  { id: 3, name: 'Bus 3 Matrouh-Delta', areaNumber: 3, createdAt: new Date(), updatedAt: new Date() },

  { id: 4, name: 'Bus 4 Matrouh-Delta', areaNumber: 4, createdAt: new Date(), updatedAt: new Date() },

  { id: 5, name: 'Bus 5 Matrouh-Delta', areaNumber: 5, createdAt: new Date(), updatedAt: new Date() },

  { id: 6, name: 'Bus 6 Matrouh-Delta', areaNumber: 6, createdAt: new Date(), updatedAt: new Date() },

  { id: 7, name: 'Bus 7 Matrouh-Delta', areaNumber: 7, createdAt: new Date(), updatedAt: new Date() },

  { id: 8, name: 'Bus 8 Matrouh-Delta', areaNumber: 8, createdAt: new Date(), updatedAt: new Date() },

  { id: 9, name: 'Bus 9 Matrouh-Delta', areaNumber: 9, createdAt: new Date(), updatedAt: new Date() },

  { id: 10, name: 'Bus 10 Matrouh-Delta', areaNumber: 10, createdAt: new Date(), updatedAt: new Date() },

  { id: 11, name: 'Bus 11 Matrouh-Delta', areaNumber: 11, createdAt: new Date(), updatedAt: new Date() },

  { id: 12, name: 'Bus 12 Matrouh-Delta', areaNumber: 12, createdAt: new Date(), updatedAt: new Date() },

  { id: 13, name: 'Bus 13 Matrouh-Delta', areaNumber: 13, createdAt: new Date(), updatedAt: new Date() },

  { id: 14, name: 'Bus 14 Matrouh-Delta', areaNumber: 14, createdAt: new Date(), updatedAt: new Date() },

  { id: 15, name: 'Bus 15 Matrouh-Delta', areaNumber: 15, createdAt: new Date(), updatedAt: new Date() },

  { id: 16, name: 'Bus 16 Matrouh-Delta', areaNumber: 16, createdAt: new Date(), updatedAt: new Date() },
];

export const busRepository = {
  findAllAsync: async (): Promise<Bus[]> => {
    return buses;
  },

  findByIdAsync: async (id: number): Promise<Bus | undefined> => {
    const resBuses = buses.filter((bus) => bus.id === id);
    if (resBuses.length === 0) {
      return;
    }
    return resBuses[0];
  },

  createAsync: async (bus: CreateBusDto): Promise<Bus> => {
    const newBus = {
      ...bus,
      id: buses.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    buses.push(newBus);
    return newBus;
  },
};
