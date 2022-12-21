import { iUserResponseDTO } from "@modules/accounts/dtos/iUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { iUserRepository } from "@modules/accounts/repositories/iUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase{

   constructor(
    @inject("UserRepository")
    private repository: iUserRepository,
   ){}

   async execute(id: string): Promise<iUserResponseDTO>{

    const user = await this.repository.findById(id)
   
    return UserMap.toDTO(user)

    // return user;

   }

}

export {
    ProfileUserUseCase
}