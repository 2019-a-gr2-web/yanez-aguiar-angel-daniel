import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "../tragos/tragos.entity";
import {TragosController} from "../tragos/tragos.controller";
import {TragosService} from "../tragos/tragos.service";
import {FiestaEntity} from "./fiesta.entity";
@Module({
    imports:[TypeOrmModule.forFeature(
        [
            FiestaEntity
        ],
        'default'
    ),], //modulos
    //controllers:[TragosController], //controladores
    //providers:[TragosService], //servicios
    //exports:[TragosService] //exportar servicios
})
export class FiestaModule {

}