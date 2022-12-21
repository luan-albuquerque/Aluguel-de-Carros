import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCategoryUseCase } from "./ListAllCategoryUseCase";

class ListAllCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    // Instanciando o useCase com Tsyringe
    const listAllCategoryUseCase = container.resolve(ListAllCategoryUseCase);

    const categories = await listAllCategoryUseCase.execute();

    return response.json(categories);
  }
}

export { ListAllCategoryController };
