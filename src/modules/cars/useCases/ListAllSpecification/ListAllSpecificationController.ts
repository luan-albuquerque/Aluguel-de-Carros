import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllSpecificationUseCase } from "./ListAllSpecificationUseCase";

class ListAllSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllSpecificationUseCase = container.resolve(
      ListAllSpecificationUseCase
    );

    const specifications = await listAllSpecificationUseCase.execute();

    return response.json(specifications);
  }
}

export { ListAllSpecificationController };
