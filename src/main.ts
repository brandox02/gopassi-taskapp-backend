import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as os from 'os';

function getLocalExternalIp(): string | null {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tecnical test GoPassi API')
    .setDescription('API for technical test gopassi')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  const localIp = getLocalExternalIp();
  console.log(`🚀 API running on:`);
  console.log(`- Localhost: http://localhost:${port}`);
  if (localIp) {
    console.log(`- Network IP: http://${localIp}:${port}`);
  } else {
    console.log('⚠️ Could not determine local IP address');
  }
}
bootstrap();
