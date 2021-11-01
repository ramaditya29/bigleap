import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidateOtp{
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    otp: number;

    

}