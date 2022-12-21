import { iCreateCarImageDTO } from "@modules/cars/dtos/iCreateCarImageDTO";
import { iCarImagesRepository } from "@modules/cars/repositories/iCarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements iCarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: iCreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
