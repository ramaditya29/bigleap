import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}