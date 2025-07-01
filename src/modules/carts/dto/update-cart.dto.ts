import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
    
    @IsNotEmpty()
    @IsNumber()
    cartId: number;


    @IsNotEmpty()
    @IsNumber()
    quantity: number;

}
