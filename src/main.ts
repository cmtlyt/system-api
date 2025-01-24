import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line node/prefer-global/process
  await app.listen(process.env.PORT ?? 8888);
}

bootstrap().catch(() => {});
