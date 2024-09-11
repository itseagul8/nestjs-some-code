import { IsIn, IsInt, IsNotEmpty, IsPositive } from "class-validator"

export class UpdateColumnOrderDto{
    @IsNotEmpty({
        message: 'Direction param must be "before" or "after"',
    })
    @IsIn(['before','after'],{
        message: 'Direction param must be "before" or "after"',
    })
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