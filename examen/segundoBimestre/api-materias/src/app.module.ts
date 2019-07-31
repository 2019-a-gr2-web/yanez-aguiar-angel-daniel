import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {estudianteEntity} from "./entity/estudiante.entity";
import {materiaEntity} from "./entity/materia.entity";
import {rolEntity} from "./entity/rol.entity";
import {SocketModule} from "./socket/socket.module";
import {usuarioEntity} from "./entity/usuario.entity";
import {facturaEntity} from "./entity/factura.entity";
import {detalleEntity} from "./entity/detalle.entity";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'examen',
    entities: [estudianteEntity,materiaEntity,rolEntity,usuarioEntity,facturaEntity,detalleEntity],
    synchronize: true,
    dropSchema: false
  }), TypeOrmModule.forFeature(
      [
        estudianteEntity,materiaEntity,rolEntity,usuarioEntity,facturaEntity,detalleEntity
      ],
      'default'
  ),SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
