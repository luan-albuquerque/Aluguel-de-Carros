import { Specification } from "../infra/typeorm/entities/Specification";

interface iCreateSpecificationRequestDTO {
  name: string;
  description: string;
}

// Interface para as funções do meu repositorio, quais ações meus useCases podem fazer no banco
interface iSpecificationRepository {
  create({
    name,
    description,
  }: iCreateSpecificationRequestDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { iSpecificationRepository, iCreateSpecificationRequestDTO };
