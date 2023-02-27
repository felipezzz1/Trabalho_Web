import carRouter from "@modules/cars/routes/car.routes";
import userRouter from "@modules/users/routes/users.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import { Router } from "express";

const routes = Router();

routes.use('/cars', carRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
