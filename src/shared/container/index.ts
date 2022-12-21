import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { iCategoryRepository } from "@modules/cars/repositories/iCategoryRepository";
import { iSpecificationRepository } from "@modules/cars/repositories/iSpecificationRepository";
import { iCarRepository } from "@modules/cars/repositories/iCarRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { iCarImagesRepository } from "@modules/cars/repositories/iCarImagesRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { iRentalsRepository } from "@modules/rentals/repositories/iRentalRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";

import "@shared/container/providers";
import { iUsersTokensRepository } from "@modules/accounts/repositories/iUsersTokensRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";

container.registerSingleton<iRentalsRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<iCarRepository>("CarRepository", CarRepository);

container.registerSingleton<iCarImagesRepository>(
  "CarsImagesRepository",
  CarImagesRepository
);

container.registerSingleton<iCategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<iSpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<iUserRepository>("UserRepository", UserRepository);

container.registerSingleton<iUsersTokensRepository>(
  "UserTokenRepository",
  UsersTokenRepository
);
