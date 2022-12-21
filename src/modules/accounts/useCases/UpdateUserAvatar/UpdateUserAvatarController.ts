import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const { id } = request.user;

    // Recebendo o file do request
    const avatarFile = request.file.filename;

    await updateUserAvatarUseCase.execute({ user_id: id, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
