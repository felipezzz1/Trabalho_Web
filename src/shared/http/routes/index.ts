import carRoutes from "@modules/cars/routes/car.routes";
import { Router } from "express";

const routes = Router();

routes.use('/cars', carRoutes);


export default routes;
