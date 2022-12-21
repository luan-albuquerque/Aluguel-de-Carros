import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { iSpecificationRepository } from "../../repositories/iSpecificationRepository";

@injectable()
class ListAllSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private repository: iSpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.repository.list();

    return specifications;
  }
}

export { ListAllSpecificationUseCase };
