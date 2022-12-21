import { ResetPasswordController } from "@modules/accounts/useCases/ResetPassword/ResetPasswordController";
import { SendForgotPasswordController } from "@modules/accounts/useCases/SendForgottenPassword/SendForgotPasswordController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
