import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GetOtpDto{
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    

}