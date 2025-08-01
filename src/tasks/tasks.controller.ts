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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @ApiOperation({
        summary: 'Create task',
        description: 'Creates a new task and emits task_created WebSocket event to all connected clients'
    })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Task created - Broadcasts task_created event',
        schema: {
            example: {
                id: 1,
                title: 'Task title',
                done: false,
                userId: 1,
                createdAt: '2023-05-20T12:34:56.789Z'
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(req.user.userId, createTaskDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all user tasks',
        description: 'Returns all tasks for the authenticated user'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of tasks',
        schema: {
            example: [{
                id: 1,
                title: 'Task 1',
                done: false,
                userId: 1,
                createdAt: '2023-05-20T12:34:56.789Z'
            }]
        }
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    findAll(@Req() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get task by ID',
        description: 'Returns a single task by ID'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task found',
        schema: {
            example: {
                id: 1,
                title: 'Task 1',
                done: false,
                userId: 1,
                createdAt: '2023-05-20T12:34:56.789Z'
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    findOne(@Req() req, @Param('id') id: string) {
        return this.tasksService.findOne(req.user.userId, +id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update task',
        description: 'Updates a task and emits task_updated WebSocket event to all connected clients'
    })
    @ApiBody({ type: UpdateTaskDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Task updated - Broadcasts task_updated event',
        schema: {
            example: {
                id: 1,
                title: 'Updated task title',
                done: true,
                userId: 1,
                updatedAt: '2023-05-20T12:34:56.789Z'
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
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
    @ApiOperation({
        summary: 'Delete task',
        description: 'Deletes a task and emits task_deleted WebSocket event to all connected clients'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Task deleted - Broadcasts task_deleted event with task ID',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    remove(@Req() req, @Param('id') id: string) {
        return this.tasksService.remove(req.user.userId, +id);
    }
}