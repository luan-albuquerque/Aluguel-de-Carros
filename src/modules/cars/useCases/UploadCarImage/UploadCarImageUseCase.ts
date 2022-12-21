import { iCarImagesRepository } from "@modules/cars/repositories/iCarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface iRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: iCarImagesRepository,
    @inject("StorageProvider")
    private storage: IStorageProvider 
  ) {}

  async execute({ car_id, images_name }: iRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
      await this.storage.save(image, "cars")
    });
  }
}

export { UploadCarImageUseCase };
