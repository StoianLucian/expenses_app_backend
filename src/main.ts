import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// npx typeorm migration:create db/migrations/YourMigrationName
//  npx typeorm migration:run -d dist/db/data-source.js
// npm run migration:generate -- db/migrations/MIGRATIONNAME
