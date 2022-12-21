import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  iCreateSpecificationRequestDTO,
  iSpecificationRepository,
} from "@modules/cars/repositories/iSpecificationRepository";

// Classe implemetada da minha interface, precisa ter todas as funções criadas na interface
class SpecificationRepository implements iSpecificationRepository {
  // repositorio privado para comunicação com banco, apenas as funções daqui podem fazer esse acesso
  private repository: Repository<Specification>;

  constructor() {
    // Iniciando o repositorio
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: iCreateSpecificationRequestDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }
}

export { SpecificationRepository };
