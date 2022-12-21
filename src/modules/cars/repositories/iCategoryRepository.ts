import { Category } from "../infra/typeorm/entities/Category";

interface iCreateCategoryRequestDTO {
  name: string;
  description: string;
}

// Interface para as funções do meu repositorio, quais ações meus useCases podem fazer no banco
interface iCategoryRepository {
  create({ name, description }: iCreateCategoryRequestDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { iCategoryRepository, iCreateCategoryRequestDTO };
