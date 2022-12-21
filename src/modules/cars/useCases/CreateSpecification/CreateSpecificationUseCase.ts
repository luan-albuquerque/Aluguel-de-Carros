import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import {
  iCreateSpecificationRequestDTO,
  iSpecificationRepository,
} from "../../repositories/iSpecificationRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private repository: iSpecificationRepository
  ) {}

  async execute({
    name,
    description,
  }: iCreateSpecificationRequestDTO): Promise<void> {
    const specification = await this.repository.findByName(name);

    if (specification) {
      throw new AppError("Specifications already exists", 400);
    }

    await this.repository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
