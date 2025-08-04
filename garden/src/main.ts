import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PlantsModule } from './plants/plants.module';

async function bootstrap() {
  const app = await NestFactory.create(PlantsModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
