import { Body, Controller, Post} from '@nestjs/common';
import { LoginUserDto } from './dtos/loginUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post()
    validateUser(@Body() userData:LoginUserDto){
        return this.authService.validateUser(userData)
    }
}
