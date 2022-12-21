import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  iCategoryRepository,
  iCreateCategoryRequestDTO,
} from "../iCategoryRepository";

class CategoryRepositoryInMemory implements iCategoryRepository {
  private categories: Category[] = [];

  async create({
    name,
    description,
  }: iCreateCategoryRequestDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name == name);

    return category;
  }
}

export { CategoryRepositoryInMemory };
