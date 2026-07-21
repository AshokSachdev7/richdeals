import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // web.telegram.org needed for the in-page auto-capture script (POSTs deals directly)
  app.enableCors({ origin: [process.env.CORS_ORIGIN ?? 'http://localhost:3000', 'https://web.telegram.org'] });
  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
