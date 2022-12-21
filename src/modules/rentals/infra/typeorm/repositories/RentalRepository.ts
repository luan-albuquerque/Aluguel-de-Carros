import { iCreateRentalDTO } from "@modules/rentals/dtos/iCreateRentalDTO";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalRepository implements iRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: iCreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRetalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id, end_date: null } });
  }
  async findOpenRetalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
  }
}

export { RentalRepository };
