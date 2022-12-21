import { iCreateRentalDTO } from "../dtos/iCreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface iRentalsRepository {
  create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: iCreateRentalDTO): Promise<Rental>;
  findOpenRetalByCar(car_id: string): Promise<Rental>;
  findOpenRetalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { iRentalsRepository };
