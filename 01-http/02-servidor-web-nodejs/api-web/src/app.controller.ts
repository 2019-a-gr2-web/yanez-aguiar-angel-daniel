import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(200)
  postHello(){
    return 'hola mundo en post';
  }
}

/*@nombreDecorador() // es una funcion
class usuario{
  @atributo()
  atributoPublico; //publico
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@parametro() atributoPublico,@otroParametro() atributoPrivado,@otroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @metodoA
  public metodoPublico(){}
  private metodoPrivado(){}
  protected metodoPrivado(){}
}*/
