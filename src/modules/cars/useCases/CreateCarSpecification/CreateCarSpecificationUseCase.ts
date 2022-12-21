import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { iSpecificationRepository } from "@modules/cars/repositories/iSpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface iRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: iCarRepository,

    @inject("SpecificationRepository")
    private specificationRepository: iSpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: iRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car isen't exists", 404);
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
