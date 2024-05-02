import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import mongoose, { Schema } from 'mongoose';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const ReservationSchema = new Schema(
  {
    ticketnumber: { type: Number, required: true },
    price: { type: Number, required: true },
    id_bus: [{ type: Schema.Types.ObjectId, ref: 'Bus' }],
    id_owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
export const ReservationModel = mongoose.model<Reservation>('Reservation', ReservationSchema);

export type Reservation = z.infer<typeof ReservationZodSchema>;

export const ReservationZodSchema = z.object({
  id: z.number(),
  ticketnumber: z.number(),
  price: z.number(),
  id_owner: z.string(),
  id_bus: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createReservationZodSchema = ReservationZodSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const CreateReservationRequest = z.object({
  body: createReservationZodSchema,
});

export const DeleteReservationZodSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const updateReservationZodSchema = z.object({
  body: ReservationZodSchema.omit({ id:true, createdAt: true, updatedAt: true }).partial(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetReservationZodSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const PatchReservationDto = ReservationZodSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();

export type CreateReservationDto = z.infer<typeof createReservationZodSchema>;