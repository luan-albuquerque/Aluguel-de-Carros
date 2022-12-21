import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe("List cars", () => {
  beforeEach(async () => {
    carsRepository = new CarRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("Shoud be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Shoud be able to list all available cars by category_id", async () => {
    const car = await carsRepository.create({
      name: "Car3",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category2",
    });

    expect(cars).toEqual([car]);
  });
  it("Shoud be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car2",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCarTest",
      category_id: "category2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brandCarTest",
    });

    expect(cars).toEqual([car]);
  });
  it("Shoud be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car3",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });
});
