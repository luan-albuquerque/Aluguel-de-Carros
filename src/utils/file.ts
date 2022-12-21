import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
      // verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }
  // remove o arquivo
  await fs.promises.unlink(filename);
};
