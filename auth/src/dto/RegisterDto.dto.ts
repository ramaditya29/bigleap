import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class RegisterDto{

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}