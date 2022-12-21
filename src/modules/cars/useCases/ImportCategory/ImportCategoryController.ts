import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    // Injetavel do tsyringe para informar que vai usar o repositorio
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    try {

      await importCategoryUseCase.execute({ file });
      return response.status(201).send();

    } catch (error) {

      return response.status(400).json({ Error: error.message });
      
    }
  }
}

export { ImportCategoryController };
