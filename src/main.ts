import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Strip properties that don't have decorators
      forbidNonWhitelisted: true,  // Throw an error if non-decorated fields are present
      transform: true,             // Automatically transform payloads to DTO instances
    }),
  );

  app.enableCors({
    origin: true, // 👈 reflects the request origin
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
