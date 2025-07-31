import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Endpoint para verificar el estado del servicio'
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del servicio',
    schema: {
      example: {
        status: 'ok',
        uptime: 12345.67,
        timestamp: '2023-05-20T12:34:56.789Z'
      }
    }
  })
  healthCheck(): object {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('ping')
  @ApiOperation({
    summary: 'Endpoint ping-pong',
    description: 'Retorna un mensaje "pong" para verificar que el servicio está activo'
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio en funcionamiento',
    schema: {
      example: {
        status: 'ok',
        message: 'pong',
        timestamp: '2023-05-20T12:34:56.789Z'
      }
    }
  })
  pingPong(): object {
    return {
      status: 'ok',
      message: 'pong',
      timestamp: new Date().toISOString()
    };
  }
}
