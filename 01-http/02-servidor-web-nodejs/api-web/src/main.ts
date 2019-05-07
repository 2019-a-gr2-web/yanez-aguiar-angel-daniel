import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';

//import * as cookieParser from 'cookieParser';
var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('secreto'));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  app.use(favicon(path.join(__dirname,'..', 'publico','imagenes', 'logo-batman.ico')))
  await app.listen(3000);
}
bootstrap();
