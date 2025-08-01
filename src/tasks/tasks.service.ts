import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'generated/prisma';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
    constructor(
        private readonly tasksRepository: TasksRepository,
        private readonly tasksGateway: TasksGateway,
    ) { }

    async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.tasksRepository.create(userId, createTaskDto);
        this.tasksGateway.emitTaskCreated(task);
        return task;
    }

    findAll(userId: number): Promise<Task[]> {
        return this.tasksRepository.findAll(userId);
    }

    findOne(userId: number, id: number): Promise<Task> {
        return this.tasksRepository.findOne(userId, id);
    }

    async update(
        userId: number,
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        const task = await this.tasksRepository.update(userId, id, updateTaskDto);
        this.tasksGateway.emitTaskUpdated(task);
        return task;
    }

    async remove(userId: number, id: number): Promise<Task> {
        const task = await this.tasksRepository.remove(userId, id);
        this.tasksGateway.emitTaskDeleted(task.id);
        return task;
    }
}