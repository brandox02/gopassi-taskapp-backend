import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksRepository } from './tasks.repository';
import { TasksGateway } from './tasks.gateway';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET
      }),
    }),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksRepository, TasksGateway, TasksService],
  exports: [TasksGateway]
})
export class TasksModule { }