import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const UsersRoutes = Router();

const createUserController = new CreateUserController();

const updateUserController = new UpdateUserAvatarController();

// utilizando configuração dinamica do multer
const upload = multer(uploadConfig.upload("./tmp/avatar"));

// nome do arquivo, que vai ser recebido no single
UsersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("avatar"),
  updateUserController.handle
);

UsersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);

export { UsersRoutes };
