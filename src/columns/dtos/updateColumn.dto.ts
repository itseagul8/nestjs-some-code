import { IsOptional, MaxLength, MinLength } from "class-validator"

export class UpdateColumnDto{
    @IsOptional()
    @MinLength(1,{
        message: 'To update title, title param must not be empty',
    })
    @MaxLength(150, {
        message: 'Title is too long',
    })
    title:string
    @IsOptional()
    @MinLength(1,{
        message: 'To update description, description param must not be empty',
    })
    @MaxLength(200, {
        message: 'Description is too long',
    })
    description:string
}