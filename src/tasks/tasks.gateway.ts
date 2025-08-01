// src/tasks/tasks.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Task } from 'generated/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/tasks',
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) { }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      // Verificar token pero no es necesario almacenar userId para este caso
      this.jwtService.verify(token);

      console.log(`Client connected: ${client.id}`);

      // Unir a todos los clientes a una sala global
      client.join('global_tasks');

    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitTaskCreated(task: Task) {
    this.server.to('global_tasks').emit('task_created', task);
  }

  emitTaskUpdated(task: Task) {
    this.server.to('global_tasks').emit('task_updated', task);
  }

  emitTaskDeleted(taskId: number) {
    this.server.to('global_tasks').emit('task_deleted', { id: taskId });
  }
}