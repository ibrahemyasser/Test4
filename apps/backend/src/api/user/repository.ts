import { User, UserModel } from '@/api/user/model';



export const userRepository = {
  findAllAsync: async () => {
    return UserModel.find().exec();
  },

  findByIdAsync: async (id: number) => {
    return UserModel.findById(id).exec();
  },

  createAsync: async (user: User) => {
    return UserModel.create(user);
  },
};