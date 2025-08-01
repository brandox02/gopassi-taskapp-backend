import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Comprar leche', description: 'Task title' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;
}