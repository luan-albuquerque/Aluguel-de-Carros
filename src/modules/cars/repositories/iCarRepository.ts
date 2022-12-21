import { iCreateCarDTO } from "../dtos/iCreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface iCarRepository {
  create(data: iCreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { iCarRepository };
