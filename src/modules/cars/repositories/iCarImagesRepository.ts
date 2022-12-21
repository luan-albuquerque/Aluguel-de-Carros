import { iCreateCarImageDTO } from "../dtos/iCreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface iCarImagesRepository {
  create({ car_id, image_name }: iCreateCarImageDTO): Promise<CarImage>;
}

export { iCarImagesRepository };
