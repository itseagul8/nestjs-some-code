import { IsNotEmpty, MaxLength } from "class-validator"

export class UpdateCommentDto{
    @IsNotEmpty({
      message: 'Text param must not be empty',
    })
    @MaxLength(150, {
      message: 'Comment is too long',
    })
    text:string
}