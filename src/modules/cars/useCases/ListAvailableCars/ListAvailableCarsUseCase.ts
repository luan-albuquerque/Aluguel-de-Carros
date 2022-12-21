import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { inject, injectable } from "tsyringe";

interface iRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarRepository")
    private repository: iCarRepository
  ) {}

  async execute({ category_id, name, brand }: iRequest): Promise<Car[]> {
    return await this.repository.findAvailable(category_id, brand, name);
  }
}

export { ListAvailableCarsUseCase };
