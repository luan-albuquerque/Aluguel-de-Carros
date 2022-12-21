import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { iCategoryRepository } from "../../repositories/iCategoryRepository";

// Informando que minha classe é instancia pelo tsyringe
@injectable()
class ListAllCategoryUseCase {
  constructor(
    // instanciando repositorio com tsyringe
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}

export { ListAllCategoryUseCase };
