import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/CreateCar/CreateCarUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let carsRepository: CarRepositoryInMemory;
let createCarsUseCase: CreateCarUseCase;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    carsRepository = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dateProvider,
      carsRepository
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    await rentalRepositoryInMemory.create({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });

    await rentalRepositoryInMemory.create({
      user_id: "124456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should be not able to create a new rental if there is expected_return_date less then 24 hours ", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "descriptionCar",
      license_plate: "license_plateCar",
      fine_amount: 100,
      daily_rate: 60,
      brand: "brandCar",
      category_id: "category",
    });
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toEqual(new AppError("Data desgraçada"));
  });
});
