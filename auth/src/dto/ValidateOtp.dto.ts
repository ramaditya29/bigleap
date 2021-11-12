import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ValidateOtp{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    otp: number;

    

}