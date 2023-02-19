import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import CostumerAvatarController from "../controllers/CostumerAvatarController";
import CostumersController from "../controllers/CostumersController";
import updateConfig from '@config/upload';
import multer from "multer";

const costumerRouter = Router();
const costumersController = new CostumersController();
const costumersAvatarController = new CostumerAvatarController();
const upload = multer(updateConfig);

costumerRouter.get('/', isAuthenticated, costumersController.index);

costumerRouter.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), costumersController.create);

costumerRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), costumersAvatarController.update);

export default costumerRouter;
