import { Controller, Get, Delete, Put, Post, HttpCode, Headers, Body, Response, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Deber: realizar una calculadora mediante el protocolo HTTP
  //puerto: 3001
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
