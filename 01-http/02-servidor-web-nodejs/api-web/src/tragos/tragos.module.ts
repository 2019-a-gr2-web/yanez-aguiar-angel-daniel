import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";

@Module({
    imports:[], //modulos
    controllers:[TragosController], //controladores
    providers:[TragosService], //servicios
    exports:[TragosService] //exportar servicios
})
export class TragosModules {

}