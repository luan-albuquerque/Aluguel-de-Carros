// classe pra controle de erros
export class AppError {
    // instanciando itens de error
  public readonly message: string;

  public readonly statusCode: number;

  // assumindo valores para classe
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
