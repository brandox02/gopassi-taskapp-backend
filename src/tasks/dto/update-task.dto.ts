import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
    @ApiProperty({ example: 'Comprar leche y pan', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    done?: boolean;
}