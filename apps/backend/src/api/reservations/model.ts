import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Reservation = z.infer<typeof ReservationSchema>;
export const ReservationSchema = z.object({
  id: z.number(),
  ticket_number: z.number(),
  price: z.number(),
  id_owner: z.number(),
  id_trip: z.number(),
  id_bus: z.number(),
  createdAt: z.date(),
});

export const createReservationSchema = z.object({
 body: z.object({
    
      ticket_number: z.number(),
      price: z.number(),
      id_owner: z.number(),
      id_trip: z.number(),
      id_bus: z.number(),
    
  }),
});

export const updateReservationSchema = z.object({
 body: z.object({
    
      id:z.number(),
     data: z.object({
      ticket_number: z.number(),
      price: z.number(),
      id_owner: z.number(),
      id_trip: z.number(),
      id_bus: z.number(),
    }),
  }),
});

// Input Validation for 'GET users/:id' endpoint
export const GetreservationSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
