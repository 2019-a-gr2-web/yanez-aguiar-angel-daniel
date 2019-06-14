import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";


@Module({
    imports:[TypeOrmModule.forFeature(
        [
            TragosEntity
        ],
        'default'
    ),], //modulos
    controllers:[TragosController], //controladores
    providers:[TragosService], //servicios
    exports:[TragosService] //exportar servicios
})
export class TragosModules {

}