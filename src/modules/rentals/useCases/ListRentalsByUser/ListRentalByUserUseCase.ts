import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: iRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalRepository.findByUser(user_id);

    return rentalByUser;
  }
}

export { ListRentalByUserUseCase };
