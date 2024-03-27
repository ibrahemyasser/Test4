import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetreservationSchema, ReservationSchema, createReservationSchema,updateReservationSchema } from '@/api/reservations/model';
import { reservationService } from '@/api/reservations/service';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { ReservationController } from './controller';

export const reservationRegistry = new OpenAPIRegistry();

reservationRegistry.register('Reservation', ReservationSchema);

export const reservationRouter: Router = (() => {
  const router = express.Router();

 

  reservationRegistry.registerPath({
    method: 'post',
    path: '/reservations',
    tags: ['Reservation'],
    request:{
      body: {
        content: {
          'application/json': {
            schema: createReservationSchema,
          },
        },
        required: true,
      },
     },
    responses: createApiResponse(ReservationSchema, 'Success'),
  });

  router.post('/', validateRequest(createReservationSchema), ReservationController.apiCreatereservation);


   reservationRegistry.registerPath({
    method: 'patch',
    path: '/reservations',
    tags: ['Reservation'],
    request:{
      body: {
        content: {
          'application/json': {
            schema: updateReservationSchema,
          },
        },
        required: true,
      },
     },
    responses: createApiResponse(ReservationSchema, 'Success'),
  });

  router.patch('/', validateRequest(updateReservationSchema), ReservationController.apiUpdatereservation);


  reservationRegistry.registerPath({
    method: 'delete',
    path: '/reservations/{id}',
    tags: ['Reservation'],
    request: { params: GetreservationSchema.shape.params },
    responses: createApiResponse(ReservationSchema, 'Success'),
  });

  router.delete('/:id', validateRequest(GetreservationSchema), ReservationController.apiDeletereservation);

  return router;
})();
