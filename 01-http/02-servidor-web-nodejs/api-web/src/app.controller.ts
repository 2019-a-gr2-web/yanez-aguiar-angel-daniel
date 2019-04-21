import {Controller, Get, HttpCode, Post, Put, Delete, Headers, Query, Param, Body,Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {response} from "express";


@Controller('/api')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Controller(segmentoAccion)
    @Get('/hello-world')  // METODO HTTP
    helloWorld(): string {
        return 'Hello world';
    }

    // POST http://localhost:3000/api
    @Post('/hola-mundo')  // METODO HTTP
    holaMundo() {
        return 'Hola mundo';
    }

    @Put('/hallo-welt')  // METODO HTTP
    salutMonde() {
        return 'hallo welt';
    }

    @Delete('/ciao-mondo')  // METODO HTTP
    olaMundo() {
        return 'ciao mondo';
    }


    @Get('/adivina')  // METODO HTTP
    adivina(@Headers() headers): string {
        console.log('Headers:',headers);
        const numeroRandomico =  Math.round(Math.random()*10);
        const numeroDeCabecera = Number(headers.numero);
        if( numeroDeCabecera == numeroRandomico){
            return 'Ok';
        }else{
            return ':(';
        }
    }

    //?llave=valor
    @Get('/consultar')
    consultar(@Query() queryParams){
        console.log(queryParams);
        if(queryParams.nombre){
            return `Hola ${queryParams.nombre}`
        }else{
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case  'guayaquil':
                return 'que maah ñañoshh';
            default:
                return 'Buenas tardes'
        }
    }

    @Post('/registroComida')
    registroComida(@Body() parametrosCuerpo,@Response() response){
        if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            const cantidad = Number(parametrosCuerpo.cantidad);
            if(cantidad>1){
                response.set('Premio','Fanesca');
            }
            return response.send({mensaje:'registro creado'});

        }else{
            return response.status(400).send({mensaje:'Error, no envia nombre o cantidad',error:400});
        }
    }
    // js -> ts

    @Get('/semilla')
    semilla(@Request() request){
        console.log(request.cookies);
        const cookies = request.cookies;
        if(cookies.miCookie){
            return 'ok';
        }else{
            return ':(';
        }
    }

    //Deber: realizar una calculadora mediante el protocolo HTTP
    @Get('/suma')
    @HttpCode(200)
    suma(@Headers() headers): number {
        console.log('Headers:',headers);
        const numero1 = Number(headers.numero1);
        const numero2 = Number(headers.numero2);
        return numero1 + numero2;
    }

    @Post('/resta')
    @HttpCode(201)
    resta(@Body() parametrosCuerpo,@Response() response){
        if(parametrosCuerpo.numero1 && parametrosCuerpo.numero2){
            const numero1 = Number(parametrosCuerpo.numero1);
            const numero2 = Number(parametrosCuerpo.numero2);
            const resultado = numero1 - numero2;
            response.set('resultado',`${resultado}`);
            return response.send({resultado:resultado});
        }
    }

    @Put('/multiplicacion')
    @HttpCode(202)
    multiplicacion(@Query() queryParams){
        console.log(queryParams);
        const numero1 = Number(queryParams.numero1);
        const numero2 = Number(queryParams.numero2);
        return numero1 * numero2;
    }

    @Delete('/division')
    @HttpCode(203)
    division(@Query() queryParams){
        console.log(queryParams);
        const numero1 = Number(queryParams.numero1);
        const numero2 = Number(queryParams.numero2);
        return numero1 / numero2;
    }

}

    /*
    const nombre: string = 'Angel'; // string
    const edad = 23;  // number
    const sueldo = 1.20;  // number
    const casado = false;  // boolean
    const hijos = null;  // null
    const alas = undefined;  // undefined
    */


    /*
    * Segmento inicial: /api
    * 1) Segmento Accion: GET 'hello-world'
    * 2) Segmento Accion: POST 'hola-mundo'
    * 3) Segmento Accion: PUT 'hallo-welt'
    * 4) Segmento Accion: DELETE 'ciao-mondo'
    * */


/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/

/*const json = [
    {
        llave: 'valor',
        "key": "value",
        'nombre': "Angel\"\"",
        edad: 23,
        sueldo: 1.20,
        casado: false,
        hijos: null,
        mascotas: [
            "cachetes",
            1,
            1.01,
            false,
            null,
            {
                "nombre":"cachetes"
            },
        ],
    },
];

// JS -> JSON

let angel = 'Angel';

// TS

let daniel:any = 'Daniel';
daniel = 1;

let objeto:any = {
    propiedad:'valor',
    propiedadDos:'valor2'
};
objeto.propiedad  // valor
objeto.propiedadDos  // valor2

// Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor 3';
delete objeto.propiedadTres; // -> destruir
objeto.propiedadTres = undefined; // -> destruir*/