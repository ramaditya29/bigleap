import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class GetOtpDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    

}