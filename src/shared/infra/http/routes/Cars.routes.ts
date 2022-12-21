import upload from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const CarsRoutes = Router();

// const uploadAvatar = multer(upload.upload("./temp/cars"));

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationController();

const uploadCardImageController = new UploadCarImageController();

CarsRoutes.get("/available", listAvailableCarsController.handle);

CarsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

CarsRoutes.post(
  "/specifications/:id",
  createCarSpecificationsController.handle
);

CarsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  // uploadAvatar.array("images"),
  uploadCardImageController.handle
);

export { CarsRoutes };
