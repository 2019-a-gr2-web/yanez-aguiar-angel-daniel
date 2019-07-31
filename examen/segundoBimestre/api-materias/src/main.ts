import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as session from 'express-session';
import * as express from "express"; // Typescript
const FileStore = require('session-file-store')(session); // Nodejs

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(
      session({
        name: 'server-session-id',
        secret: 'El secreto del examen',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false
        },
        store: new FileStore()
      })
  );
  app.use(express.static('publico'));
  await app.listen(3005);
}
bootstrap();
