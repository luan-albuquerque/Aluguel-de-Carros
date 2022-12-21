import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import {
  iCategoryRepository,
  iCreateCategoryRequestDTO,
} from "@modules/cars/repositories/iCategoryRepository";

// Injetavel do tsyringe para informar que vai usar o repositorio
@injectable()
class CreateCategoryUseCase {
  constructor(
    // Instanciando o repositorio para uso do serviço
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  async execute({
    name,
    description,
  }: iCreateCategoryRequestDTO): Promise<void> {
    const category = await this.repository.findByName(name);

    if (category) {
      throw new AppError("Category already exists", 400);
    }

    await this.repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
