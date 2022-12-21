import { AppError } from "@shared/errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/inMemory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  // antes de algum teste executa uma função
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "category test",
      description: "category description test",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exist", async () => {
    const category = {
      name: "category test",
      description: "category description test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    expect(async () => {
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toEqual(new AppError("Category already exists", 400));
  });
});
