import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: iCarRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  it("Shoud be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Shoud note be able to create a new car wiwth exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "descriptionCar",
        license_plate: "license_plateCar",
        fine_amount: 100,
        daily_rate: 60,
        brand: "brandCar",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "descriptionCar",
        license_plate: "license_plateCar",
        fine_amount: 100,
        daily_rate: 60,
        brand: "brandCar",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Shoud be able to create a new car available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car1",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
