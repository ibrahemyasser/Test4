import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import mongoose, { Schema } from 'mongoose';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const BusSchema = new Schema(
  {
    name: { type: String, required: true },
    areaNumber: { type: Number, required: true },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
  },
  { timestamps: true }
);
export const BusModel = mongoose.model<Bus>('Bus', BusSchema);

export type Bus = z.infer<typeof BusZodSchema>;
export const BusZodSchema = z.object({
  id: z.number(),
  name: z.string(),
  areaNumber: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetBusSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateBusSchema = BusZodSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const CreateBusRequest = z.object({
  body: CreateBusSchema,
});

export const DeleteBusSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const PatchBusRequest = z.object({
  params: z.object({ id: commonValidations.id }),
  body: BusZodSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial(),
});

export const AddReservationToBusRequest = z.object({
  params: z.object({ id: commonValidations.id }),
  body: z.object({ reservationId: commonValidations.id }),
});

export const RemoveReservationFromBusRequest = z.object({
  params: z.object({ id: commonValidations.id }),
  body: z.object({ reservationId: commonValidations.id }),
});

export const PatchBusDto = BusZodSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();

export type CreateBusDto = z.infer<typeof CreateBusSchema>;

// export type PatchBusDto = z.infer<typeof PatchBusRequest>;
