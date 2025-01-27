import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@configs/upload';

import { CreateUserController } from '@modules/accounts/controllers/CreateUserController';
import { ReadUserController } from '@modules/accounts/controllers/ReadUserController';
import { UpdateUserController } from '@modules/accounts/controllers/UpdateUserController';
import { DeleteUserController } from '@modules/accounts/controllers/DeleteUserController';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const readUserController = new ReadUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post(
  '/create',
  uploadAvatar.single('avatar'),
  createUserController.handle
);

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/read/:id', readUserController.handle);
usersRoutes.put('/update/:id', updateUserController.handle);
usersRoutes.delete('/delete/:id', deleteUserController.handle);

export { usersRoutes };
