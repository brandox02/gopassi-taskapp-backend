import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user'
    })
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty({
        example: 'securePassword123',
        description: 'The password of the user',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}