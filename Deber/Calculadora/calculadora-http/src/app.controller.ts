import { Controller, Get, Delete, Put, Post, HttpCode, Headers, Body, Response, Request, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {isNumber} from "util";

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Deber: realizar una calculadora mediante el protocolo HTTP
  //puerto: 3001
  @Get('/suma')
  @HttpCode(200)
  suma(@Headers() headers){
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





  //Deber2 parte 1: Crear una ruta HTTP con el metodo que ustedes queiran y el nombre que ustedes deseen

  @Get('/cookieSuma')
  @HttpCode(200)
  cookieSuma(@Headers() headers, @Request() request, @Response() response){
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
  
  

  @Post('/cookieResta')
  @HttpCode(201)
  cookieResta(@Body() parametrosCuerpo, @Request() request,@Response() response){
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
        const numero1 = Number(parametrosCuerpo.numero1);
        const numero2 = Number(parametrosCuerpo.numero2);
        const result = numero1 - numero2;
        response.set('resultado',`${result}`);
        response.send({nombre:cookies.nombre, resultado:result});
      }
  }

  @Put('/cookieMultiplicacion')
  @HttpCode(202)
  cookieMultiplicacion(@Query() queryParams, @Request() request, @Response() response){
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
      console.log(queryParams);
      const numero1 = Number(queryParams.numero1);
      const numero2 = Number(queryParams.numero2);
      const result = numero1 * numero2;
      response.send({nombre:cookies.nombre, resultado:result});
    }
  }

  @Delete('/cookieDivision')
  @HttpCode(203)
  cookieDivision(@Query() queryParams, @Request() request, @Response() response){
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
      console.log(queryParams);
      const numero1 = Number(queryParams.numero1);
      const numero2 = Number(queryParams.numero2);
      const result = numero1 / numero2;
      response.send({nombre:cookies.nombre, resultado:result});
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


//Deber 2 parte 2: Al usar cualquier operacion por primera vez , suma, resta,
// multiplicacion o division el sistema va a guardar una cookie segura con el valor de 100.
// Al ejecutar cualquier operacion de su calculadora, el resultado de la operacion se va a
// restar del total de la cookie segura.
// Al llegar a cero van a agregar al objeto json
// {
// nombreUsuario:'Adrian',
// resultado: 2,
// mensaje: 'Se le terminaron sus puntos'
// }

  @Get('/calcu')
  calcu(@Headers() headers, @Request() request, @Response() response){
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);
    const nombre = headers.nombre;
    const operacion = headers.operacion;
    const cookies = request.cookies;
    var result;
    if(operacion=='suma'){
      result = suma(numero1,numero2);
    };
    if(operacion=='resta'){
      result = resta(numero1,numero2);
    };
    if(operacion=='multiplicacion'){
      result = multiplicacion(numero1,numero2);
    };
    if(operacion=='division'){
      result = division(numero1,numero2);
    };
    const esquemaValidacionResultado = Joi.object().keys({result:Joi.number().required()});
    const objetoValidacionResultado = {result:result};
    const resultado = Joi.validate(objetoValidacionResultado,esquemaValidacionResultado);
    if(resultado.error){
      console.log('Resultado',resultado);
    }else{
      var valor = request.signedCookies.segura;
      if(valor){
        valor = valor - result;
        if(valor==0){
          response.send({nombreUsuario:nombre, resultado:result, mensaje:'se le terminaron sus puntos'});
          console.log('valor en cookie:',valor);
        }else{
          response.cookie('segura',valor,{signed:true});
          response.send({nombreUsuario:nombre, resultado:result});
          console.log('valor actual en cookie:',valor);
        }
      }else{
        response.cookie('segura','100',{signed:true});
        response.send({nombreUsuario:nombre, resultado:result});
        console.log('valor inicial en cookie:',100);
      }
    }
  }


}


function suma(a,b) {
  const esquemaValidacionNumero1 = Joi.object().keys({numero1:Joi.number().required()});
  const objetoValidacion1 = {numero1:a};
  const resultado1 = Joi.validate(objetoValidacion1,esquemaValidacionNumero1);
  const esquemaValidacionNumero2 = Joi.object().keys({numero2:Joi.number().required()});
  const objetoValidacion2 = {numero2:b};
  const resultado2 = Joi.validate(objetoValidacion2,esquemaValidacionNumero2);
  if(resultado1.error){
    return `Resultadoresultado: ${resultado1}`;
  }else if(resultado2.error){
    return `Resultadoresultado: ${resultado2}`;
  }else{
    return a + b;
  }
}

function resta(a,b) {
  const esquemaValidacionNumero1 = Joi.object().keys({numero1:Joi.number().required()});
  const objetoValidacion1 = {numero1:a};
  const resultado1 = Joi.validate(objetoValidacion1,esquemaValidacionNumero1);
  const esquemaValidacionNumero2 = Joi.object().keys({numero2:Joi.number().required()});
  const objetoValidacion2 = {numero2:b};
  const resultado2 = Joi.validate(objetoValidacion2,esquemaValidacionNumero2);
  if(resultado1.error){
    return `Resultadoresultado: ${resultado1}`;
  }else if(resultado2.error){
    return `Resultadoresultado: ${resultado2}`;
  }else{
    return a - b;
  }
}

function multiplicacion(a,b) {
  const esquemaValidacionNumero1 = Joi.object().keys({numero1:Joi.number().required()});
  const objetoValidacion1 = {numero1:a};
  const resultado1 = Joi.validate(objetoValidacion1,esquemaValidacionNumero1);
  const esquemaValidacionNumero2 = Joi.object().keys({numero2:Joi.number().required()});
  const objetoValidacion2 = {numero2:b};
  const resultado2 = Joi.validate(objetoValidacion2,esquemaValidacionNumero2);
  if(resultado1.error){
    return `Resultadoresultado: ${resultado1}`;
  }else if(resultado2.error){
    return `Resultadoresultado: ${resultado2}`;
  }else{
    return a * b;
  }
}

function division(a,b) {
  const esquemaValidacionNumero1 = Joi.object().keys({numero1:Joi.number().required()});
  const objetoValidacion1 = {numero1:a};
  const resultado1 = Joi.validate(objetoValidacion1,esquemaValidacionNumero1);
  const esquemaValidacionNumero2 = Joi.object().keys({numero2:Joi.number().positive().required()});
  const objetoValidacion2 = {numero2:b};
  const resultado2 = Joi.validate(objetoValidacion2,esquemaValidacionNumero2);
  if(resultado1.error){
    return `Resultadoresultado: ${resultado1}`;
  }else if(resultado2.error){
    return `Resultadoresultado: ${resultado2}`;
  }else{
    return a / b;
  }
}
