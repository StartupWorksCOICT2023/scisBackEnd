import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://scis.vercel.app/',
    credentials: true, // Set to true if you need to include credentials (e.g., cookies) in the request
  });
  await app.listen(3333);
}
bootstrap();