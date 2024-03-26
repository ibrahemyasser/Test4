
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

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
