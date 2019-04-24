import { Controller, Get, Delete, Put, Post, HttpCode, Headers, Body, Response, Request, Query} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

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





  //Deber2: Crear una ruta HTTP con el metodo que ustedes queiran y el nombre que ustedes deseen

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
}
