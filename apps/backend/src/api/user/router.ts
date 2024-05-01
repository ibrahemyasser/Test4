import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetUserSchema, userZodSchema } from '@/api/user/model';
import { userService } from '@/api/user/service';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';
import { UserController } from './controller';

export const userRegistry = new OpenAPIRegistry();

userRegistry.register('User', userZodSchema);

export const userRouter: Router = (() => {
  const router = express.Router();

  userRegistry.registerPath({
    method: 'get',
    path: '/users',
    tags: ['User'],
    responses: createApiResponse(z.array(userZodSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'post',
    path: '/users',
    tags: ['User'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: userZodSchema,
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(userZodSchema, 'Success'),
  });

  router.post('/', async (req: Request, res: Response) => UserController.createUser(req, res));

  userRegistry.registerPath({
    method: 'get',
    path: '/users/{id}',
    tags: ['User'],
    request: { params: GetUserSchema.shape.params },
    responses: createApiResponse(userZodSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetUserSchema), UserController.getUser);
  return router;
})();
