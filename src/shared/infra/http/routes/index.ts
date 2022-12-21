import { Router } from "express";
import { AuthenticateRoutes } from "./Authenticate.routes";
import { CarsRoutes } from "./Cars.routes";
import { CategoriesRoutes } from "./Categories.routes";
import { passwordRoutes } from "./Password.routes";
import { RentalRoutes } from "./Rentals.routes";
import { SpecificationsRoutes } from "./Specifications.routes";
import { UsersRoutes } from "./Users.routes";

const routes = Router();

routes.use(AuthenticateRoutes);
routes.use("/users", UsersRoutes);
routes.use("/categories", CategoriesRoutes);
routes.use("/specifications", SpecificationsRoutes);
routes.use("/cars", CarsRoutes);
routes.use("/password", RentalRoutes);
routes.use("/", passwordRoutes);

export { routes };
