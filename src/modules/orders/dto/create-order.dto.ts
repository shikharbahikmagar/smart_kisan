import { IsNotEmpty } from "class-validator";
import { PaymentMethod } from "../../../constants/enum/payment-method-enum";

export class CreateOrderDto {

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    SAddress: string;

    @IsNotEmpty()
    SCity: string;

    @IsNotEmpty()
    SProvince: string;

    @IsNotEmpty()
    STole: string;

    @IsNotEmpty()
    paymentMethod: PaymentMethod;





}
