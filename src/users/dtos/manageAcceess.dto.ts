import { IsEmail, IsIn, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class ManageAcceessDto {
    @IsNotEmpty({
        message: 'Action param must not be empty',
    })
    @IsIn(['grant','exclude'],{
        message: 'Action param must be "grant" or "exclude"',
    })
    action:string
    @IsEmail()
    @MinLength(5,{
        message: 'Email is too short',
    })
    @MaxLength(80,{
        message: 'Email is too long',
    })
    email:string
}