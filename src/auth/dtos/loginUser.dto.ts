import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty({
        message: 'Email param must not be empty',
    })
    @IsEmail()
    @MinLength(5)
    @MaxLength(80)
    email:string
    @IsNotEmpty({
        message: 'Password param must not be empty',
    })
    password:string
}