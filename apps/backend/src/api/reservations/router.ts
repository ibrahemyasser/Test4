import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import {
  GetReservationZodSchema,
  ReservationZodSchema,
  createReservationZodSchema,
  updateReservationZodSchema,
  CreateReservationRequest,
} from '@/api/reservations/model';
import { reservationService } from '@/api/reservations/service';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { ReservationController } from './controller';

export const reservationRegistry = new OpenAPIRegistry();

reservationRegistry.register('Reservation', ReservationZodSchema);

export const reservationRouter: Router = (() => {
  const router = express.Router();

  reservationRegistry.registerPath({
    method: 'get',
    path: '/reservations',
    tags: ['Reservation'],
    responses: createApiResponse(z.array(ReservationZodSchema), 'Success'),
  });

  router.get('/', ReservationController.apiGetAllreservations);

  reservationRegistry.registerPath({
    method: 'get',
    path: '/reservations/{id}',
    tags: ['Reservation'],
    request: { params: GetReservationZodSchema.shape.params },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetReservationZodSchema), ReservationController.apiGetreservationById);

  reservationRegistry.registerPath({
    method: 'get',
    path: '/reservations/owner/{id}',
    tags: ['Reservation'],
    request: { params: GetReservationZodSchema.shape.params },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.get('/owner/:id', validateRequest(GetReservationZodSchema), ReservationController.apiGetreservationByIdOwner);

  reservationRegistry.registerPath({
    method: 'post',
    path: '/reservations',
    tags: ['Reservation'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createReservationZodSchema,
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.post('/', validateRequest(CreateReservationRequest), ReservationController.apiCreatereservation);

  reservationRegistry.registerPath({
    method: 'patch',
    path: '/reservations',
    tags: ['Reservation'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateReservationZodSchema,
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.patch('/', validateRequest(updateReservationZodSchema), ReservationController.apiUpdatereservation);

  reservationRegistry.registerPath({
    method: 'get',
    path: '/reservations/owner/{id}',
    tags: ['Reservation'],
    request: { params: GetReservationZodSchema.shape.params },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.get('/owner/:id', validateRequest(GetReservationZodSchema), ReservationController.apiGetreservationByIdOwner);

  reservationRegistry.registerPath({
    method: 'delete',
    path: '/reservations/{id}',
    tags: ['Reservation'],
    request: { params: GetReservationZodSchema.shape.params },
    responses: createApiResponse(ReservationZodSchema, 'Success'),
  });

  router.delete('/:id', validateRequest(GetReservationZodSchema), ReservationController.apiDeletereservation);

  return router;
})();
