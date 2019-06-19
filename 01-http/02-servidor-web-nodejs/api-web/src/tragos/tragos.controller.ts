import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";

@Controller('/api/traguito')
export class TragosController {

    constructor(private readonly _tragosService: TragosService) { //inyeccion de dependencia

    }

    @Get('lista')
    async listarTragos(@Res() res) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {
            arregloTragos: arregloTragos
        })
    }

    @Get('crear')
    crearTrago(@Res() res, @Query('mensaje')mensaje:string) {
        res.render('tragos/crear-editar',{mensaje: mensaje})
    }

    @Post('crear')
    async crearTragoPost(@Body() trago: Trago,
                         @Res() res
                         // @Body('nombre') nombre:string,
                         // @Body('tipo') tipo:string,
                         // @Body('gradosAlcohol') gradosAlcohol:number,
                         // @Body('fechaCaducidad') fechaCaducidad:Date,
                         // @Body('precio') precio:number,
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);
            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaCrear = await this._tragosService.crear(trago); //promesa
                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/api/traguito/lista');
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
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
    ) {
        this._tragosService.eliminarPorId(id);
        res.redirect('/api/traguito/lista')


        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);
    }
}