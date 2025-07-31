import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;


    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}