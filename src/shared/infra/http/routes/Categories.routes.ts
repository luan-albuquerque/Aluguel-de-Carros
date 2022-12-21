import { Router } from "express";
import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ListAllCategoryController } from "@modules/cars/useCases/ListAllCategory/ListAllCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategory/ImportCategoryController";

import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
// instanciando multer
const upload = multer({ dest: "../../tmp" });

const CategoriesRoutes = Router();

// Instanciando controllers
const listAllCategoryController = new ListAllCategoryController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

// Busca lista com todas as categorias
CategoriesRoutes.get("/", listAllCategoryController.handle);

// Criar nova categoria
CategoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

CategoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { CategoriesRoutes };
