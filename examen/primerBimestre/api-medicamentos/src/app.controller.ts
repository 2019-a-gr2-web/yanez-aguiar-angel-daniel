import {Controller, Get, Res, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/examen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  login(@Res() res){
    res.render('login')
  }

  @Get('principal')
  principal(@Res() res){
    res.render('pantallaPrincipal')
  }

  @Get('paciente')
  paciente(@Res() res){
    res.render('gestionarPapas')
  }

  @Get('crearPaciente')
  crearPaciente(@Res() res){
    res.render('crearPapa')
  }

  @Post('principal')
  principalPost(@Body() nombre: string,
                    @Res() res
  ){
    //this._tragosService.eliminarPorId(id);
    res.redirect('/api/examen/principal')
  }
}
