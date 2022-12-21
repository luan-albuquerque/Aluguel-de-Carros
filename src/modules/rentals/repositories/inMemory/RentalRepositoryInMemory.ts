import { iCreateRentalDTO } from "@modules/rentals/dtos/iCreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "../iRentalRepository";

class RentalRepositoryInMemory implements iRentalsRepository {
  private rentalRepository: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
    id,
  }: iCreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      id,
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      end_date,
      total,
      created_date: new Date(),
      updated_at: new Date(),
    });

    this.rentalRepository.push(rental);

    return rental;
  }

  async findOpenRetalByCar(car_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRetalByUser(user_id: string): Promise<Rental> {
    return this.rentalRepository.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentalRepository.find((rental) => rental.id === id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentalRepository.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalRepositoryInMemory };
