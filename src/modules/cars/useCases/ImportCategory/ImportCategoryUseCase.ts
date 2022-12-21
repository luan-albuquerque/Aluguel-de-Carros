import { inject, injectable } from "tsyringe";
import { iCategoryRepository } from "../../repositories/iCategoryRepository";
import fs from "fs";
import { parse } from "csv-parse";

interface iRequest {
  file: Express.Multer.File;
}

interface iFileCategory {
  name: string;
  description: string;
}

// injetavel na classe para iniciar a classe
@injectable()
class ImportCategoryUseCase {
  constructor(
    // injetavel no repositorio para uso
    @inject("CategoryRepository")
    private repository: iCategoryRepository
  ) {}

  loadingCSV({ file }: iRequest): Promise<iFileCategory[]> {
    // uso de uma promise para percorrer um csv
    return new Promise((resolve, reject) => {
      // instanciando um array que recebe os dados do csv
      const fileCategories: iFileCategory[] = [];

      // criando uma stream de leitura de um arquivo temporario
      const stream = fs.createReadStream(file.path);

      // instanciando as configurações do pipe
      const csv = parse();

      // pipe configurado para leitura
      stream.pipe(csv);

      //função que trata os dados do arquivo
      csv.on("data", async (item) => {
        const [name, description] = item;

        const FileCategory = { name, description } as iFileCategory;

        fileCategories.push(FileCategory);
      });

      // função que encerra após a leitura dos arquivos e retorna um valor da promise
      csv.on("end", () => {
        resolve(fileCategories);
      });

      // função que retorna em caso de erro
      csv.on("error", (err) => {
        reject(err);
      });
    });
  }

  async execute({ file }: iRequest): Promise<void> {
    // função que trata o arquivo e retorna um array tratado
    const fileCategory = await this.loadingCSV({ file });

    // map para adicionar ao banco
    fileCategory.map(async ({ name, description }) => {
      const category = await this.repository.findByName(name);

      if (!category) {
        // adiciando os dados tratos ao banco
        await this.repository.create({ name, description });
      }
    });

    // apagando arquivo temporario
    fs.unlink(file.path, (err) => {});
  }
}

export { ImportCategoryUseCase };
