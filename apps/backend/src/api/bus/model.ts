import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { BusController } from './controller';

extendZodWithOpenApi(z);

export type Bus = z.infer<typeof BusSchema>;
export const BusSchema = z.object({
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

export const CreateBusSchema = BusSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const CreateBusRequest = z.object({
  body: CreateBusSchema,
});

export const DeleteBusSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
export const PatchBusRequest = z.object({
  params: z.object({ id: commonValidations.id }),
  body: BusSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial(),
});

export const PatchBusDto = BusSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();

export type CreateBusDto = z.infer<typeof CreateBusSchema>;

// export type PatchBusDto = z.infer<typeof PatchBusRequest>;
