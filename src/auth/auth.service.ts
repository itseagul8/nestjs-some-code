import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserParams } from './utils/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}
    async validateUser(userData:LoginUserParams){
        const user = await this.userService.getUserByEmail(userData.email)
        if(!user){
            throw new HttpException('User Not Found',404); 
        }
        const isMatch = await bcrypt.compare(userData.password,user.password)
        if(!isMatch){
            throw new HttpException('Validation failed',404); 
        }
        return this.jwtService.sign({id:user.id,username:user.email,role:user.role})
    }
}
