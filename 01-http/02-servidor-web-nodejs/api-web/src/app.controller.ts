import {
    Controller,
    Get,
    HttpCode,
    Post,
    Put,
    Delete,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response,
    Session, Res
} from '@nestjs/common';
import {AppService} from './app.service';
import {response} from "express";
import * as Joi from '@hapi/joi';


@Controller('/api')
export class AppController {

    arregloUsusarios = [];



    constructor(private readonly appService: AppService) {
    }

    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        console.log(session);
        session.autenticado = true;
        session.nombreUsuario = nombre;
        return 'ok';
    }

    @Get('login')
    loginVista(
        @Res() res
    ){
        res.render('login');
    }

    @Post('login')
    login(
        @Body() usuario,
        @Session() session,
        @Res() res
    ){
        if(usuario.username==='angel' && usuario.password === '12345678'){
            session.username = usuario.username;
            res.redirect('/api/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/login');
        }
    }

    @Get('logout')
    logout(
        @Res() res,
        @Session() session
    ){
        session.username=undefined;
        session.destroy();
        res.redirect('/api/login');
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
    semilla(@Request() request,@Response() response){
        console.log(request.cookies);
        const cookies = request.cookies; //json
        const esquemaValidacionNumero = Joi.object().keys({
            numero:Joi.number().integer().required()
        });
        const objetoValidacion = {
            numero:cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,esquemaValidacionNumero);
        if(resultado.error){
            console.log('Resultado',resultado);
        }else{
            console.log('Numero Valido');
        }
        const cookieSegura = request.signedCookies.fechaServidor;
        if(cookieSegura){
            console.log('cookie Segura');
        }else{
            console.log('No es valida esta cookie');
        }
        if(cookies.miCookie){
            const horaFechaServidor = new Date();
            const minutos=horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos+1);
            response.cookie(
                'fechaServidor', //nombre
                new Date().getTime(), //valor
                { //opciones
                    //expires: horaFechaServidor
                    signed:true
                }
            );
            return response.send('ok');
        }else{
            return response.send(':(');
        }
    }

    @Get('/nombre')
    nombre(@Headers() headers, @Request() request, @Response() response){
        const cookies = request.cookies; //json
        const esquemaValidacionNumero = Joi.object().keys({
            nombre:Joi.string().required()
        });
        const objetoValidacion = {
            nombre:cookies.nombre
        };
        const resultado = Joi.validate(objetoValidacion,esquemaValidacionNumero);
        if(resultado.error){
            console.log('Resultado',resultado);
        }else{
            console.log('Nombre Valido');
            console.log('Headers:',headers);
            const numero1 = Number(headers.numero1);
            const numero2 = Number(headers.numero2);
            const result = numero1 + numero2;
            response.send({nombre:cookies.nombre, resultado:result});
        }
    }

    @Get('/inicio')//endpoint
    inicio(
        @Response() res
    ){
        return res.render('inicio', {
            estaVivo: true
        });
    }

    @Get('/peliculas')
    peliculas(
        @Response() res
    ){
        return res.render('peliculas/inicio', {

        });
    }

    @Get('/estilos')
    estilos(
        @Response() res
    ){
        return res.render('peliculas/estilos', {

        });
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

//variables ? const, var, let
//string, number, boolean

function holaMundo() {
    console.log('hola mundo');
}
const respuestaHolaMundo = holaMundo();
console.log('resp hola mundo',respuestaHolaMundo);
function suma(a,b) {
    return a + b;
}
const respuestaSuma = suma(1,2);//3
console.log('resp suma:',respuestaSuma);

//condicionales
//truty->true
//falsy->false
if(true){//truty
    console.log('verdadero');
}else{
    console.log('false');
}

if(false){//falsy
    console.log('verdadero');
}else{
    console.log('false');
}

if(""){//falsy
    console.log('verdadero ""');
}else{
    console.log('false ""');
}

if("a"){//truty
    console.log('verdadero "a"');
}else{
    console.log('false "a"');
}

if(0){//falsy
    console.log('verdadero 0');
}else{
    console.log('false 0');
}

if(-1){//truty
    console.log('verdadero -1');
}else{
    console.log('false -1');
}

if(1){//truty
    console.log('verdadero 1');
}else{
    console.log('false 1');
}

if(undefined){//falsy
    console.log('verdadero "undefined"');
}else{
    console.log('false undefined');
}

if(null){//falsy
    console.log('verdadero null');
}else{
    console.log('false null');
}

if({}){//truty
    console.log('verdadero null');
}else{
    console.log('false null');
}

//operadores de arreglos en JS
const arreglo = [1,'a',true,null,{},[]];

const arregloNumeros = [1,2,3,4,5,6];
//1)impriman en consola todos los elementos
const arregloNumerosForEach = [1,2,3,4,5,6];
const rForEach = arregloNumerosForEach.forEach(function (valorActual,indice,arreglo) {
    console.log(`Valor:${valorActual}`);
    //console.log(`indice:${indice}`);
    //console.log(`arreglo:${arreglo}`);
});
console.log(`Respuesta forEach: ${rForEach}`);
const rForEach2 = arregloNumerosForEach.forEach(n => console.log(`Valor:${n}`));
//2)sumen 2 a los pares y 1 a los impares
const arregloNumerosMap = [1,2,3,4,5,6];
const rMap = arregloNumerosMap.map(//devolver el nuevo valor de ese elemento
    (valorActual)=>{
        const esPar = valorActual % 2 == 0;
        if(esPar){
            const nuevoValor = valorActual + 2;
            return nuevoValor;
        }else{
            const nuevoValor = valorActual + 1;
            return nuevoValor;
        }
    });
console.log(`respuesta map: ${rMap}`);

//3) encuentre si hay un numero 4

const arregloNumerosFind = [1,2,3,4,5,6];
const rFind = arregloNumerosFind.find(
    (valorActual)=>{
        return valorActual == 4;
    }
);
console.log(`Respuesta Find: ${rFind}`);
//4)filtren los numeros menores a 5

const arregloNumerosFilter = [1,2,3,4,5,6];
const rFilter = arregloNumerosFilter.filter(//agregar al arreglo true; se omite del arreglo false
    (valorActual)=>{
        return valorActual<5;
    }
);
console.log(`Respuesta Filter: ${rFilter}`);

//5)todos los valores positivos TRUE FALSE
const arregloNumerosEvery = [1,2,3,4,5,6];
const respuestaEvery = arregloNumerosEvery.every(//si todos cumplen TRUE
                            //si alguno no cumple FALSE
    (valorActual)=>{
        return valorActual>0
    }
);
console.log(respuestaEvery);//TRUE

//6)algun valor es menor que 2
const arregloNumerosSome = [1,2,3,4,5,6];
const respuestaSome = arregloNumerosSome.some(
    (valorActual)=>{
        return valorActual>2
    }
);
console.log(respuestaSome);

//7)sumen todos los valores
const arregloNumerosReduce = [1,2,3,4,5,6];
const valorDondeEmpiezaElCalculo = 0;
//<4
//10&+5
//>=4
//15%+3
const respuestaReduce = arregloNumerosReduce.reduce(
    (acumulado, valorActual)=>{
        if(valorActual<4){
            return acumulado + valorActual*1.1 + 5;
        }else{
            return acumulado + valorActual*1.15 + 3;
        }
    },
    valorDondeEmpiezaElCalculo
);
console.log(respuestaReduce);


//8)resten todos los valores de 100
const arregloNumerosReduce2 = [1,2,3,4,5,6];
const valorDondeEmpiezaElCalculo2 = 100;
const respuestaReduce2 = arregloNumerosReduce.reduce(
    (acumulado, valorActual)=>{
            return acumulado - valorActual;
    },
    valorDondeEmpiezaElCalculo2
);
console.log(respuestaReduce2);

//1.1)sumen 10 a todos
//1.2)filtren a los mayores a 15
//1.3)si hay algun numero mayor a 30
const arregloEjercicio = [1,2,3,4,5,6];
const respuestaEjercicio = arregloEjercicio.map((valorActual)=>{
    return valorActual + 10;
}).filter((valorActual)=>{
    return valorActual > 15;
}).some((valorActual)=>{
    return valorActual >30;
});
console.log(respuestaEjercicio);