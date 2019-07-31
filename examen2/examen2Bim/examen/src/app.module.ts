import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './Login/login.module';
import { TiendaModule } from './Padre/padre.module';
import { ProductosModule } from './Hijo/hijo.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { PedidoModule } from './Pedido/pedido.module';
import { DespachoModule } from './Despacho/despacho.module';
import { MateriaEntity } from './Hijo/hijo.entity';
import { EstudianteEntity } from './Padre/padre.entity';
import { DetalleEntity } from './Detalle/detalle.entity';
import { PedidoEntity } from './Pedido/pedido.entity';
import { UsuarioEntity } from './Usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    LoginModule,
    TiendaModule,
    ProductosModule,
    UsuarioModule,
    PedidoModule,
    DespachoModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre cadena conex por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'examenFinal1',
      entities: [
          MateriaEntity,
          EstudianteEntity,
          DetalleEntity,
          PedidoEntity,
          UsuarioEntity
      ],
      synchronize: true,
      dropSchema: true
    })
    , TypeOrmModule.forFeature(
        [
          MateriaEntity,
          EstudianteEntity,
          DetalleEntity,
          PedidoEntity,
          UsuarioEntity
        ],
        'default'
    )


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
