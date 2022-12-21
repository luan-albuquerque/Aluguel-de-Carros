import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/DevolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/ListRentalsByUser/ListRentalByUserController";
import { ListRentalByUserUseCase } from "@modules/rentals/useCases/ListRentalsByUser/ListRentalByUserUseCase";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const RentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

RentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

RentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

RentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalByUserController.handle
);

export { RentalRoutes };
