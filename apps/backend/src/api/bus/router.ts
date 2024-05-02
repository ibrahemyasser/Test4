import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import {
  GetBusSchema,
  BusZodSchema,
  CreateBusRequest,
  DeleteBusSchema,
  PatchBusDto,
  PatchBusRequest,
  AddReservationToBusRequest,
  RemoveReservationFromBusRequest,
} from '@/api/bus/model';
import { busService } from '@/api/bus/service';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { BusController } from './controller';

export const busRegistry = new OpenAPIRegistry();

busRegistry.register('Bus', BusZodSchema);

export const busRouter: Router = (() => {
  const router = express.Router();

  busRegistry.registerPath({
    method: 'get',
    path: '/buses',
    tags: ['Bus'],
    responses: createApiResponse(z.array(BusZodSchema), 'Success'),
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
    responses: createApiResponse(BusZodSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetBusSchema), BusController.getBusById);

  busRegistry.registerPath({
    method: 'post',
    path: '/buses',
    tags: ['Bus'],
    request: {
      params: GetBusSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: CreateBusRequest,
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(BusZodSchema, 'Success'),
  });

  router.post('/', validateRequest(CreateBusRequest), BusController.createBus);

  busRegistry.registerPath({
    method: 'delete',
    path: '/buses',
    tags: ['Bus'],
    request: {
      params: GetBusSchema.shape.params,
    },
    responses: createApiResponse(BusZodSchema, 'Success'),
  });

  router.delete('/:id', validateRequest(DeleteBusSchema), BusController.deleteBus);

  busRegistry.registerPath({
    method: 'delete',
    path: '/buses',
    tags: ['Bus'],
    request: {
      params: GetBusSchema.shape.params,
    },
    responses: createApiResponse(BusZodSchema, 'Success'),
  });
  router.patch('/:id', validateRequest(PatchBusRequest), BusController.patchBus);

  busRegistry.registerPath({
    method: "post",
    path: "/buses/{id}/reservations",
    tags: ["Bus"],
    request: {
      params: GetBusSchema.shape.params,
      body: {
        content: {
          "application/json": {
            schema: z.object({ reservationId: z.number() }),
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(BusZodSchema, "Success"),
  });
  router.post("/:id/reservations", validateRequest(AddReservationToBusRequest), BusController.addReservationToBus);

  busRegistry.registerPath({
    method: "delete",
    path: "/buses/{id}/reservations",
    tags: ["Bus"],
    request: {
      params: GetBusSchema.shape.params,
      body: {
        content: {
          "application/json": {
            schema: z.object({ reservationId: z.number() }),
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(BusZodSchema, "Success"),
  });

  router.delete("/:id/reservations", validateRequest(RemoveReservationFromBusRequest), BusController.removeReservationFromBus);
  return router;
})();
