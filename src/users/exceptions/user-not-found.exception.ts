import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(username: number) {
        super(`User with username ${username} not found`);
    }
}