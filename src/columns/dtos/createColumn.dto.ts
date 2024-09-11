import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator"

export class CreateColumnDto{
    @IsNotEmpty({
        message: 'Title param must not be empty',
    })
    @MinLength(1,{
        message: 'Title param must not be empty',
    })
    @MaxLength(150, {
        message: 'Title is too long',
    })
    title:string
    @IsOptional()
    @MinLength(1,{
        message: 'To set description, description param must not be empty',
    })
    @MaxLength(200, {
        message: 'Description is too long',
    })
    description:string
}