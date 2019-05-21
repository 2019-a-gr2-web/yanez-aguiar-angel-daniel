import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModules} from "./tragos/tragos.module";

@Module({
  imports: [TragosModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
