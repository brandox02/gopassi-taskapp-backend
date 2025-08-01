import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { username: createUserDto.username }
        });

        if (existingUser) {
            throw new ConflictException('El nombre de usuario o el correo electrónico ya están en uso');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = await this.prisma.user.create({
            data: {
                fullname: createUserDto.fullname,
                username: createUserDto.username,
                password: hashedPassword
            },
            select: {
                id: true,
                username: true,
                createdAt: true,
                fullname: true
            }
        });
        return createdUser;
    }

    async findUserByUsername(username: string) {
        return this.prisma.user.findUnique({ where: { username } });
    }

    async validateUser(username: string, password: string) {
        const user = await this.findUserByUsername(username);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        const { password: _, ...result } = user;
        return result;
    }


}