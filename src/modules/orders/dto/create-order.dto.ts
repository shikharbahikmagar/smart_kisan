import { IsNotEmpty } from "class-validator";
import { PaymentMethod } from "../../../constants/enum/payment-method-enum";

export class CreateOrderDto {

    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    s_address: string;

    @IsNotEmpty()
    s_city: string;

    @IsNotEmpty()
    s_province: string;

    @IsNotEmpty()
    s_tole: string;

    @IsNotEmpty()
    paymentMethod: PaymentMethod;





}
