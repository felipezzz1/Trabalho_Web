import carRouter from "@modules/cars/routes/car.routes";
import costumerRouter from "@modules/costumers/routes/costumers.routes";
import passwordRouter from "@modules/costumers/routes/password.routes";
import profileRouter from "@modules/costumers/routes/profile.routes";
import sessionsRouter from "@modules/costumers/routes/sessions.routes";
import { Router } from "express";

const routes = Router();

routes.use('/cars', carRouter);
routes.use('/costumers', costumerRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
