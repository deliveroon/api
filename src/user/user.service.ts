import { Injectable } from '@nestjs/common';
import { User } from "../entities/user";
import { getRepository } from "typeorm";

@Injectable()
export class UserService {

    async getUser(username: string) : Promise<User>{
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                username: username
            }
        });
        return user;
    }
}
