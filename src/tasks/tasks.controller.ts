// src/tasks/tasks.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'generated/prisma';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @ApiOperation({ summary: 'Create task' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Task created'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    })
    create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(req.user.userId, createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all user tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of tasks',
    })
    findAll(@Req() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    findOne(@Req() req, @Param('id') id: string) {
        return this.tasksService.findOne(req.user.userId, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update task' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task updated',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.update(req.user.userId, +id, updateTaskDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete task' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Task deleted',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    remove(@Req() req, @Param('id') id: string) {
        return this.tasksService.remove(req.user.userId, +id);
    }
}