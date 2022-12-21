import multer from "multer";
import { resolve } from "path"; // identificar pasta
import crypto from "crypto"; // função do node pra encriptar coisas

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
        tmpFolder,
       // opção de configuração do multer que será importada
        storage: multer.diskStorage({
        // identifica a pasta onde será salv o arquivo
        // nome da pasta enviada na rota
        destination: tmpFolder,
        // garante que não salvará pastas com o mesmo nome
        filename: (request, file, callback) => {
          // cria um hash pra randomizar o nome
          const fileHash = crypto.randomBytes(16).toString("hex");

          // adiciona o hash ao nome original
          const filename = `${fileHash}-${file.originalname}`;

          // verifica se deu tudo certo e retorna o nome
          return callback(null, filename);
        },
      }),

};
