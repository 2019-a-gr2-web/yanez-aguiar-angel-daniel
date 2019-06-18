import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController {

    constructor(private readonly _tragosService:TragosService){ //inyeccion de dependencia

    }

    @Get('lista')
    async listarTragos(@Res() res){
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
}

    @Get('crear')
    crearTrago(@Res() res){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    async crearTragoPost(@Body() trago: Trago,
                   @Res() res
                   // @Body('nombre') nombre:string,
                   // @Body('tipo') tipo:string,
                   // @Body('gradosAlcohol') gradosAlcohol:number,
                   // @Body('fechaCaducidad') fechaCaducidad:Date,
                   // @Body('precio') precio:number,
){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);

        try {
            const respuestaCrear = await this._tragosService.crear(trago); //promesa
            console.log('RESPUESTA: ', respuestaCrear);
            res.redirect('/api/traguito/lista');
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje:'Error',codigo:500});
        }



        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);
    }

    @Post('eliminar')
    eliminarTragoPost(@Body() id: number,
                   @Res() res
                   // @Body('nombre') nombre:string,
                   // @Body('tipo') tipo:string,
                   // @Body('gradosAlcohol') gradosAlcohol:number,
                   // @Body('fechaCaducidad') fechaCaducidad:Date,
                   // @Body('precio') precio:number,
    ){
        this._tragosService.eliminarPorId(id);
        res.redirect('/api/traguito/lista')


        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);
    }
}