import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModules} from "./tragos/tragos.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";

@Module({
  imports: [TragosModules,DistribuidorModule,FiestaModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [TragosEntity,DistribuidorEntity,FiestaEntity],
    synchronize: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
