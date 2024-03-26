
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetBusSchema, BusSchema } from '@/api/bus/model';
import { busService } from '@/api/bus/service';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { BusController } from './controller';

export const busRegistry = new OpenAPIRegistry();

busRegistry.register('Bus', BusSchema);

export const busRouter: Router = (() => {
  const router = express.Router();

  busRegistry.registerPath({
    method: 'get',
    path: '/buses',
    tags: ['Bus'],
    responses: createApiResponse(z.array(BusSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await busService.findAll();
    res.send(serviceResponse);
  });

  busRegistry.registerPath({
    method: 'get',
    path: '/buses/{id}',
    tags: ['Bus'],
    request: { params: GetBusSchema.shape.params },
    responses: createApiResponse(BusSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetBusSchema), BusController.getBusById);
  return router;
})();
