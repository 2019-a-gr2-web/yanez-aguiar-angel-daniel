import {Controller, Get, HttpCode, Post, Put, Delete, Headers} from '@nestjs/common';
import {AppService} from './app.service';

// http://192.168.1.10:3000/segmentoInicial/segmentoAccion
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/borrar
// @Controller(segmentoInicial)
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
        console.log('Headers: ', headers);
        const numeroRandomico =  Math.round(Math.random()*10);
        const numeroDeCabecera = Number(headers.numero);

        if( numeroDeCabecera == numeroRandomico){
            return 'Ok';
        }else{
            return ':(';
        }


    }


    // js -> ts






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


}


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

const json = [
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
objeto.propiedadTres = undefined; // -> destruir