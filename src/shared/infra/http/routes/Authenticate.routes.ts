import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";

const AuthenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

AuthenticateRoutes.post("/sessions", authenticateUserController.handle);

AuthenticateRoutes.post("/refresh_token", refreshTokenController.handle);

export { AuthenticateRoutes };
