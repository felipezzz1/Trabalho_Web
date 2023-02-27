import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import UserAvatarController from "../controllers/UserAvatarController";
import UsersController from "../controllers/UsersController";
import updateConfig from '@config/upload';
import multer from "multer";

const userRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(updateConfig);

userRouter.get('/', isAuthenticated, usersController.index);

userRouter.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create);

userRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update);

export default userRouter;
