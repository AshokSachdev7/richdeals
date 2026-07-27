import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Deal submitters paste a photo of the product; a base64 data URL blows past
  // express's 100kb default. 8mb covers a phone photo before we downscale it.
  app.use(json({ limit: '8mb' }));
  // web.telegram.org needed for the in-page auto-capture script (POSTs deals directly)
  app.enableCors({ origin: [process.env.CORS_ORIGIN ?? 'http://localhost:3000', 'https://web.telegram.org'], credentials: true });
  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
