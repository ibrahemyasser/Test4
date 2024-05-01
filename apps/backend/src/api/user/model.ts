import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import mongoose, { Schema } from 'mongoose';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const userZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),

});
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  age: { type: Number, required: true },
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);

export type User = z.infer<typeof userZodSchema>

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});