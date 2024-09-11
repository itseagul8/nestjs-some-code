import { IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export class CreateCardDto{
    @IsOptional()
    @MaxLength(200, {
        message: 'Title is too long',
    })
    title:string
    @IsNotEmpty({
        message: 'Description param must not be empty',
    })
    @MaxLength(300, {
        message: 'Description is too long',
    })
    description:string
}