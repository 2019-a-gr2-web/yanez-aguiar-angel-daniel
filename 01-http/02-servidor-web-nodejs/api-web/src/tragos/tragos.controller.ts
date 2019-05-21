import {Controller, Get, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";

@Controller('/api/traguito')
export class TragosController {

    constructor(private readonly _tragosService:TragosService){ //inyeccion de dependencia

    }

    @Get('lista')
    listarTragos(@Res() res){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
}

}