import { IsEmail, Matches, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsEmail()
    @MinLength(5,{
        message: 'Email is too short',
    })
    @MaxLength(80,{
        message: 'Email is too long',
    })
    email:string
    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]).{8,128}$")
    password:string
}