import { Controller, Get, Param } from '@nestjs/common';
import { User } from "../entities/user";
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private userService: UserService){}
    @Get('/:username')
    private async getUser(@Param('username') username: string) : Promise<User>{
        const user = this.userService.getUser(username);
        return user;
    }
}
