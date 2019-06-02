import {Controller, Get, Res, Post, Body, Query, Param, Req} from '@nestjs/common';
import { AppService } from './app.service';
import {Paciente} from "./interfaces/paciente";
import {Medicamento} from "./interfaces/medicamento";
import {empty} from "rxjs/internal/Observer";

@Controller('/api/examen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  login(@Res() res){
    res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
    res.render('login')
  }

  @Get('principal')
  principal(@Req() req, @Res() res){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      res.render('pantallaPrincipal',{nombreUsuario:cookieSegura})
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }

  }

  @Get('paciente')
  paciente(@Req() req, @Res() res){
    const arregloPacientes = this.appService.bddPaciente;
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      res.render('gestionarPapas',{arregloPacientes:arregloPacientes,nombreUsuario:cookieSegura})
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Get('pacienteB')
  pacienteB(@Req() req, @Res() res){
    const arregloPacientes = this.appService.bddBusquedaP;
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      res.render('gestionarPapas',{arregloPacientes:arregloPacientes,nombreUsuario:cookieSegura})
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }

  }

  @Get('/medicamentos/:id')
  medicamentos(@Req() req, @Res() res, @Param() param){
    const arregloMedicamentos = this.appService.bddMedicamento;
    const cookieSegura = req.signedCookies.usuario;
    this.appService.idPadre=param.id;
    switch (param.id) {
      default:
        if(cookieSegura){
          console.log(cookieSegura);
          res.render('gestionarHijos',{idPadre:this.appService.idPadre, arregloMedicamentos:arregloMedicamentos,nombreUsuario:cookieSegura})
        }else{
          res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
          res.redirect('/api/examen/login')
        }
    }
  }

  @Get('/medicamentosB/:id')
  medicamentosB(@Req() req, @Res() res, @Param() param){
    const arregloMedicamentos = this.appService.bddBusquedaM;
    const cookieSegura = req.signedCookies.usuario;
    this.appService.idPadre=param.id;
    switch (param.id) {
      default:
        if(cookieSegura){
          console.log(cookieSegura);
          res.render('gestionarHijos',{idPadre:this.appService.idPadre, arregloMedicamentos:arregloMedicamentos,nombreUsuario:cookieSegura})
        }else{
          res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
          res.redirect('/api/examen/login')
        }
    }
  }

  @Get('crearPaciente')
  crearPaciente(@Req() req, @Res() res){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      res.render('crearPapa')
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Get('crearMedicamento')
  crearMedicamento(@Req() req, @Res() res){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      res.render('crearHijo',{idPadre:this.appService.idPadre})
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('login')
  loginPost(@Res() res
  ){
    res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
    res.redirect('/api/examen/login')
  }

  @Post('principal')
  principalPost(@Body() nombre: string, @Res() res
  ){
    if(nombre['nombre']===''){
      res.redirect('/api/examen/login')
    }else {
      res.cookie('usuario', nombre['nombre'], {expires:new Date('2021-06-02') ,signed: true});
      res.redirect('/api/examen/principal')
    }
  }

  @Post('pacientePost')
  pacientePost(@Req() req, @Body() paciente: Paciente, @Res() res
  ){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      if(this.appService.crearPaciente(paciente) == true){
        res.redirect('/api/examen/paciente')
      }else{
        console.log(this.appService.crearPaciente(paciente));
      }
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('medicamentosPost')
  medicamentosPost(@Req() req, @Body() medicamento: Medicamento, @Res() res
  ){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      if(this.appService.crearMedicamento(medicamento) == true){
        res.redirect('/api/examen/medicamentos/'+this.appService.idPadre)
      }else{
        console.log(this.appService.crearMedicamento(medicamento));
      }
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('eliminar')
  eliminarPacientePost(@Req() req, @Body() id: number, @Res() res
  ){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      this.appService.eliminarPaciente(id);
      res.redirect('/api/examen/paciente')
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('eliminarM')
  eliminarMedicamentoPost(@Req() req, @Body() id: number, @Res() res
  ){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      console.log(cookieSegura);
      this.appService.eliminarMedicamento(id);
      res.redirect('/api/examen/medicamentos/'+this.appService.idPadre)
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('pacienteBusqueda')
  pacienteBusqueda(@Req() req, @Res() res, @Body() busqueda:string){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      if(busqueda['busqueda']===''){
        res.redirect('/api/examen/paciente')
      }
      this.appService.bddBusquedaP.splice(0,this.appService.bddBusquedaP.length);
      const arregloPacientes = this.appService.bddPaciente;
      arregloPacientes.forEach((paciente)=>{
        this.appService.buscarPaciente(paciente,busqueda['busqueda'])
      });
      res.redirect('/api/examen/pacienteB')
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }

  @Post('medicamentosBusqueda')
  medicamentosBusqueda(@Req() req, @Res() res, @Body() busqueda:string){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      if(busqueda['busqueda']===''){
        res.redirect('/api/examen/medicamentos/'+this.appService.idPadre)
      }
      this.appService.bddBusquedaM.splice(0,this.appService.bddBusquedaM.length);
      const arregloMedicamentos = this.appService.bddMedicamento;
      arregloMedicamentos.forEach((medicamento)=>{
        this.appService.buscarMedicamento(medicamento,busqueda['busqueda'])
      });
      res.redirect('/api/examen/medicamentosB/'+this.appService.idPadre)
    }else{
      res.cookie('usuario','',{expires:new Date('Thu, 01 Jan 1970 00:00:01 GMT'),signed:false});
      res.redirect('/api/examen/login')
    }
  }
}
