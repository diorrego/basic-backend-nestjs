import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger();
    await app.listen(3000);
    logger.log(`Server running on ${await app.getUrl()}`);
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
