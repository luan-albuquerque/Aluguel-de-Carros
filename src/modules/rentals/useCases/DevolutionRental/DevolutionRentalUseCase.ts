import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { iDateProvider } from "@shared/container/providers/DateProvider/iDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface iRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: iRentalsRepository,

    @inject("CarRepository")
    private carsRepository: iCarRepository,

    @inject("DayJsDateProvider")
    private dateProvider: iDateProvider
  ) {}

  async execute({ id, user_id }: iRequest) {
    const minimumDaily = 1;

    const rental = await this.rentalsRepository.findById(id);

    const cars = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    // calculando multa
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    // verificar o tempo de aluguel
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * cars.fine_amount;
      total = calculate_fine;
    }

    total += daily * cars.daily_rate;

    rental.end_date = this.dateProvider.dateNow();

    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(cars.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
