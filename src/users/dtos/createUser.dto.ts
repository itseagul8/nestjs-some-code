import { IsEmail, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @MinLength(5,{
        message: 'Email is too short',
    })
    @MaxLength(80,{
        message: 'Email is too long',
    })
    email:string
    @MinLength(8,{
        message: 'Password is too short',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]).{8,128}$/, {
        message:
          'Password is not strong enough',
      })
    password:string
    
}