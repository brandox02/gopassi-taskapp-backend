import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksRepository } from './tasks/tasks.repository';


@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, TasksService, TasksRepository],
})
export class AppModule { }
