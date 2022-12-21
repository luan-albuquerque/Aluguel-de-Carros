import { iCreateCarDTO } from "@modules/cars/dtos/iCreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private repository: iCarRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: iCreateCarDTO): Promise<Car> {
    const carAlreadyExist = await this.repository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExist) {
      throw new AppError("Car already exists!");
    }

    const car = await this.repository.create({
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export { CreateCarUseCase };
