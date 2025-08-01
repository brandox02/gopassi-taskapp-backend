import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserNotFoundException } from 'src/users/exceptions/user-not-found.exception';

@ApiTags('Authentication') // Agrupa todos los endpoints bajo esta sección
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate user and return JWT token'
    })
    @ApiBody({
        type: LoginUserDto,
        description: 'User credentials',
        examples: {
            admin: {
                summary: 'Admin user',
                value: { username: "admin", password: "admin123" }
            },
            regular: {
                summary: 'Regular user',
                value: { username: "user", password: "user123" }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Login successful',
        schema: {
            example: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid request format'
    })
    async login(@Request() req) {
        const access_token = await this.authService.login(req.user);
        const responseUser = await this.usersService.findUserByUsername(req.user.username)
        if (!responseUser) {
            throw new UserNotFoundException(req.user.username);
        }
        const { password, ...user } = responseUser;
        return { access_token, user }
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Register new user',
        description: 'Create a new user account'
    })
    @ApiBody({
        type: CreateUserDto,
        description: 'User registration data',
        examples: {
            minimal: {
                summary: 'Minimal data',
                value: {
                    username: "newuser",
                    email: "user@example.com",
                    password: "securePassword123",
                    fullname: "New User"
                }
            },
            full: {
                summary: 'All fields',
                value: {
                    username: "newuser",
                    email: "user@example.com",
                    password: "securePassword123"
                }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User successfully created',
        schema: {
            example: {
                id: 1,
                username: "newuser",
                email: "user@example.com",
                createdAt: "2023-05-20T12:34:56.789Z"
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Username or email already exists',
        schema: {
            example: {
                statusCode: 409,
                message: "Username or email already exists",
                error: "Conflict"
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Validation error',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    "username must be a string",
                    "email must be a valid email",
                    "password must be at least 8 characters"
                ],
                error: "Bad Request"
            }
        }
    })
    async create(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.usersService.createUser(createUserDto);
        const access_token = await this.authService.register(createdUser.username, createdUser.id)
        return {
            user: createdUser, access_token
        }
    }
}