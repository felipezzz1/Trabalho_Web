import { Router } from "express";
import CarsController from "../controllers/CarsController";

const carRoutes = Router();
const productsController = new CarsController();

carRoutes.get('/', productsController.index);
carRoutes.get('/:id', productsController.show);
carRoutes.post('/', productsController.create);
carRoutes.put('/:id', productsController.update);
carRoutes.delete('/:id', productsController.delete);

export default carRoutes;

