import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'generated/prisma';

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TasksRepository) { }

    create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.create(userId, createTaskDto);
    }

    findAll(userId: number): Promise<Task[]> {
        return this.tasksRepository.findAll(userId);
    }

    findOne(userId: number, id: number): Promise<Task> {
        return this.tasksRepository.findOne(userId, id);
    }

    update(
        userId: number,
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.tasksRepository.update(userId, id, updateTaskDto);
    }

    remove(userId: number, id: number): Promise<void> {
        return this.tasksRepository.remove(userId, id);
    }
}