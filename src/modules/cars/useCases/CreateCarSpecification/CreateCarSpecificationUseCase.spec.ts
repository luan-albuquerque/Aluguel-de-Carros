import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarRepositoryInMemory;
let specificationRepository: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationRepository
    );
  });

  it("Should be not able to add a new specification to the car isn't exists", async () => {
    expect(async () => {
      const car_id = "1234";

      const specifications_id = ["brabo"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    const specification = await specificationRepository.create({
      name: "test name",
      description: "test description",
    });

    const SpecificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(SpecificationCar).toHaveProperty("specifications");
    expect(SpecificationCar.specifications.length).toBe(1);
  });
});
