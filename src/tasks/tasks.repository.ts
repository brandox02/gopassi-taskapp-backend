
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'generated/prisma';
import { TaskNotFoundException } from './exceptions/task-not-found.exception';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepository {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                userId,
            },
        });
    }

    async findAll(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true, username: true, fullname: true
                    }
                }
            }
        });
    }

    async findOne(userId: number, id: number): Promise<Task> {
        const task = await this.prisma.task.findFirst({
            where: { id, userId },
            include: {
                user: {
                    select: {
                        id: true, username: true, fullname: true
                    }
                }
            }
        });

        if (!task) {
            throw new TaskNotFoundException(id);
        }

        return task;
    }

    async update(
        userId: number,
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        await this.findOne(userId, id);

        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(userId: number, id: number): Promise<void> {
        await this.findOne(userId, id);

        await this.prisma.task.delete({
            where: { id },
        });
    }
}