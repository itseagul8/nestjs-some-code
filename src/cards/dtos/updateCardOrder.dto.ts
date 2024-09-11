import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, MaxLength } from "class-validator"

export class UpdateCardOrderDto{
    @IsNotEmpty({
        message: 'Action param must not be empty',
    })
    @IsIn(['change-order','change-position'],{
        message: 'Action param must be "change-order" or "change-position"',
    })
    action:string
    @IsOptional()
    @IsIn(['before','after',{
        message: 'Direction param must be "before" or "after"',
    }])
    direction:string
    @IsNotEmpty({
        message: 'Placeid param must be positive integer value',
    })
    @IsInt({
        message: 'Placeid param must be positive integer value',
    })
    @IsPositive({
        message: 'Placeid param must be positive integer value',
    })
    placeid:number
}