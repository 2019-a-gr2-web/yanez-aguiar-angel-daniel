import {Body, Controller, Get, Param, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {MateriaCreateDto} from "./dto/materia.create.dto";
import {validate} from "class-validator";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  login(@Res() res){
    res.render('login')
  }

  @Post('/login')
  async loginPost(@Body() estudiante,
                          @Session() session,
                          @Res() res){
    const arregloEstudiante = await this.appService.buscarUsuario({relations:["rolId"],where:{rolId: {idRol: estudiante.tipoUsuario},email:estudiante.usuario,password:estudiante.password}});
    arregloEstudiante.forEach((datosEstudiante)=>{
      if(datosEstudiante.idUsuario){
        session.username=datosEstudiante.nombre;
        session.rol=datosEstudiante.rolId.idRol;
        session.userId=datosEstudiante.idUsuario;
        this.appService.idUsuario=datosEstudiante.idUsuario;
      }else{
        session.username='undefined';
        console.log(datosEstudiante.nombre);
        console.log(datosEstudiante.rolId.idRol);
        console.log(datosEstudiante.idUsuario);
      }
    })
    if(session.username==='undefined'){
      res.redirect('/examen/login');
    }else{
      res.redirect('/examen/pantallaPrincipal');
    }
  }

  @Get('/pantallaPrincipal')
  pantallaPrincipal(@Res() res, @Session() session){
      if(session.username){
          res.render('pantallaPrincipal')
      }else{
          res.redirect('/examen/login')
      }
  }

  @Get('/estudiante')
  async estudiante(@Res() res,@Session() session){
      if(session.username) {
          const arregloEstudiante = await this.appService.buscarEstudiante();
          res.render('gestionarPapas', {idRol:session.rol,arregloEstudiantes: arregloEstudiante})
      }else{
          res.redirect('/examen/login')
      }
  }

  @Get('/materias/:id')
  async materia(
      @Res() res,
      @Param() param,
      @Session() session){
      if(session.username) {
          this.appService.idpadre = param.id;
          const arregloMateria = await this.appService.buscarMateria({
              relations: ["estudianteId"],
              where: {estudianteId: {id: param.id}}
          });
          res.render('gestionarHijos', {idRol:session.rol,arregloMaterias: arregloMateria})
      }else{
          res.redirect('/examen/login')
      }
  }

  @Get('/crearMateria')
  crearMateria(@Res() res, @Session() session){
      if(session.username) {
          res.render('crearHijo', {idPadre: this.appService.idpadre})
      }else{
          res.redirect('/examen/login')
      }
  }

  @Post('materiasPost')
  async materiasPost(
      @Body() materia,
      @Res() res

  ) {
    materia.numeroHorasPorSemana = Number(materia.numeroHorasPorSemana);
    materia.precio = Number(materia.precio);
    materia.estudianteId = Number(materia.estudianteId);
    materia.activo = Boolean(materia.activo);
    materia.fechaCreacion = materia.fechaCreacion ? new Date(materia.fechaCreacion) : undefined;
    let materiaAValidar = new MateriaCreateDto();

    materiaAValidar.nombre = materia.nombre;
    materiaAValidar.codigo = materia.codigo;
    materiaAValidar.descripcion = materia.descripcion;
    materiaAValidar.activo = materia.activo;
    materiaAValidar.fechaCreacion = materia.fechaCreacion;
    materiaAValidar.numeroHorasPorSemana = materia.numeroHorasPorSemana;
    materiaAValidar.precio = materia.precio;
    materiaAValidar.estudianteId = materia.estudianteId;
    try {
      const errores = await validate(materiaAValidar);
      console.log(errores);
      console.log(materiaAValidar);
      console.log(materia);
      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/examen/crearMateria');
      } else {
        const respuestaCrear = await this.appService.crearMateria(materia);
        console.log('Respues: ', respuestaCrear);
        res.redirect('/examen/materias/'+this.appService.idpadre);
      }

    } catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500});
    }

    console.log(materia);
  }

  @Post('/materiasBusqueda')
  async materiasBusqueda(@Res() res, @Body() buscar:string){
      if(buscar['buscar']===''){
        res.redirect('/examen/materias/'+this.appService.idpadre)
      }
    this.appService.bddBusquedaM.splice(0,this.appService.bddBusquedaM.length);
    const arregloMateria = await this.appService.buscarMateria({relations:["estudianteId"],where:[{estudianteId:{id:this.appService.idpadre},nombre:buscar['buscar']},{estudianteId:{id:this.appService.idpadre},codigo:buscar['buscar']}]});
      arregloMateria.forEach((materia)=>{
        this.appService.bddBusquedaM.push(materia);
      })
      res.redirect('/examen/materiasB/'+this.appService.idpadre);
  }

  @Get('/materiasB/:id')
  materiasB(@Res() res, @Param() param, @Session() session){
      if(session.username) {
          const arregloMateria = this.appService.bddBusquedaM;
          this.appService.idpadre = param.id;
          res.render('gestionarHijos', {idRol:session.rol,arregloMaterias: arregloMateria})
      }else{
          res.redirect('/examen/login')
      }
  }

  @Post('/eliminarM')
  eliminarMedicamentosPost(@Body() id: number, @Res() res){
    this.appService.eliminarMateriaPorId(id);
    res.redirect('/examen/materias/'+this.appService.idpadre)
  }

  @Get('logout')
  logout(
        @Res() res,
        @Session() session
  ){
        session.username=undefined;
        session.rol=undefined;
        session.destroy();
        res.redirect('/examen/login');
  }

  @Post('/irAlCarrito')
  async irAlCarrito(@Body() id: number, @Res() res){
      const arregloUsurios = await this.appService.buscarUsuario({where:{idUsuario:2}});
      res.redirect('/websockets/index.html')
  }

}
