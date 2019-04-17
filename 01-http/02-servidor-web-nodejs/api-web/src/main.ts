import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookieParser';
var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
