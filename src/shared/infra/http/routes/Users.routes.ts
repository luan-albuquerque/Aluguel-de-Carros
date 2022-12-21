import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ProfileUserController } from "@modules/accounts/useCases/ProfileUser/ProfileUserController";

const UsersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController()

// utilizando configuração dinamica do multer
const upload = multer(uploadConfig);

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

UsersRoutes.get(
  "/profile",
  ensureAuthenticated,
  profileUserController.handle
);
export { UsersRoutes };
