import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import CarsController from "../controllers/CarsController";

const carRouter = Router();
const carController = new CarsController();

carRouter.get('/', carController.index);
carRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), carController.show);

carRouter.post('/', celebrate({
    [Segments.BODY]:{
        model : Joi.string().required(),
        color : Joi.string().required(),
        plate : Joi.string().required(),
        mileage : Joi.number().required(),
        seats : Joi.number().required(),
        price : Joi.number().required(),
        year : Joi.number().required(),
        quantity : Joi.number().required()
    }
}), carController.create);

carRouter.put('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY] : {
        model : Joi.string(),
        color : Joi.string(),
        plate : Joi.string(),
        mileage : Joi.number(),
        seats : Joi.number(),
        price : Joi.number(),
        quantity : Joi.number(),
        year : Joi.number(),
    }
}), carController.update);

carRouter.delete('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
}) ,carController.delete);

export default carRouter;

