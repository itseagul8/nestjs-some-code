import { IsOptional, MaxLength, MinLength } from "class-validator"

export class UpdateCardDto{
    @IsOptional()
    @MinLength(1)
    @MaxLength(200, {
        message: 'Title is too long',
    })
    title:string
    @IsOptional()
    @MinLength(1)
    @MaxLength(300, {
        message: 'Description is too long',
    })
    description:string
}