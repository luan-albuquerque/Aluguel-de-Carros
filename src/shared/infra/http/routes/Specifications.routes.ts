import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListAllSpecificationController } from "@modules/cars/useCases/ListAllSpecification/ListAllSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const SpecificationsRoutes = Router();

const listAllSpecificationController = new ListAllSpecificationController();
const createSpecificationController = new CreateSpecificationController();

SpecificationsRoutes.use(ensureAuthenticated);

// listando todas as specifications
SpecificationsRoutes.get("/", listAllSpecificationController.handle);

// Criando uma nova specifacion
SpecificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { SpecificationsRoutes };
