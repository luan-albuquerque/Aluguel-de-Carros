import { iCreateCarDTO } from "@modules/cars/dtos/iCreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { iCarRepository } from "../iCarRepository";

class CarRepositoryInMemory implements iCarRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
    specification,
    id,
  }: iCreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,
      available: true,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    // Filtro pra listagem de carros
    const all = this.cars.filter((car) => {
      if (
        car.available === true || // separa apenas os carros com status true
        (category_id && category_id === car.category_id) || // verifica se foi mandando categoria e se for mandado separa os daquela categoria
        (brand && brand === car.brand) || // verifica se foi mandando marca e se for mandado separa todas as marcas
        (name && name === car.name) // verifica se foi mandando nome e se for mandado separa todos daquele nome

        // se nenhum dado for mandado, retorna apenas os carros com status true
        // se apenas um dado for mando o filtro retorn apenas os carros com o status true e o carrinho
      ) {
        return car;
      }
    });

    // aqui retorna o filtro completo
    return all;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id == id);

    this.cars[index].available = available;
  }
}

export { CarRepositoryInMemory };
