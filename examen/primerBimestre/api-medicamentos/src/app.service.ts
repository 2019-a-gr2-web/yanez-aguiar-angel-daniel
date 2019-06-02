import { Injectable } from '@nestjs/common';
import {Paciente} from "./interfaces/paciente";
import {Medicamento} from "./interfaces/medicamento";
import * as Joi from '@hapi/joi';

@Injectable()
export class AppService {
  bddPaciente:Paciente[] = [];
  bddMedicamento:Medicamento[] = [];
  bddBusquedaP:Paciente[]=[];
  bddBusquedaM:Medicamento[]=[];
  recnumM = 1;
  recnum = 1;
  idPadre=0;

  constructor(){
    const paciente:Paciente={
      nombres:'Angel Daniel',
      apellidos:'Yanez Aguiar',
      fechaNacimiento:new Date(1996,0,8),
      hijos:0,
      tieneSeguro:false
    };
    this.crearPaciente(paciente);
  }



    crearPaciente(nuevoPaciente:Paciente){
      nuevoPaciente.id=this.recnum;
      this.recnum++;
      nuevoPaciente.fechaNacimiento = new Date(nuevoPaciente.fechaNacimiento);
      nuevoPaciente.fechaNacimiento.setDate(nuevoPaciente.fechaNacimiento.getDate()+1);
      const esquemaValidacion = Joi.object().keys({
        nombres:Joi.string().required(),
        apellidos:Joi.string().required(),
        hijos:Joi.number().integer().required(),
        fecha:Joi.date().required(),
        seguro:Joi.boolean().required()
      });
      const objetoValidacion = {
        nombres:nuevoPaciente.nombres,
        apellidos: nuevoPaciente.apellidos,
        hijos:nuevoPaciente.hijos,
        fecha:nuevoPaciente.fechaNacimiento,
        seguro:nuevoPaciente.tieneSeguro
      };

      const resultado = Joi.validate(objetoValidacion,esquemaValidacion);
      if(resultado.error){
        console.log('resultado',resultado);
        return resultado;
      }else{
        this.bddPaciente.push(nuevoPaciente);
        return true;
      }
  }


  crearMedicamento(nuevoMedicamento:Medicamento){
    nuevoMedicamento.id=this.recnumM;
    this.recnumM++;
    nuevoMedicamento.pacienteId = this.idPadre;
    nuevoMedicamento.fechaCaducidad = new Date(nuevoMedicamento.fechaCaducidad);
    nuevoMedicamento.fechaCaducidad.setDate(nuevoMedicamento.fechaCaducidad.getDate()+1);
    const esquemaValidacion = Joi.object().keys({
      gramosAIngerir:Joi.number().required(),
      nombre:Joi.string().required(),
      composicion:Joi.string().required(),
      usadoPara:Joi.string().required(),
      fecha:Joi.date().required(),
      numeroPastillas:Joi.number().integer().required(),
      pacienteId:Joi.number().integer().required(),
    });
    const objetoValidacion = {
      gramosAIngerir:nuevoMedicamento.gramosAIngerir,
      nombre:nuevoMedicamento.nombre,
      composicion:nuevoMedicamento.composicion,
      usadoPara:nuevoMedicamento.usadoPara,
      fecha:nuevoMedicamento.fechaCaducidad,
      numeroPastillas:nuevoMedicamento.numeroPastillas,
      pacienteId:nuevoMedicamento.pacienteId
    };

    const resultado = Joi.validate(objetoValidacion,esquemaValidacion);
    if(resultado.error){
      console.log('resultado',resultado);
      return resultado;
    }else{
      this.bddMedicamento.push(nuevoMedicamento);
      return true;
    }
  }


  eliminarPaciente(id:number):Paciente[]{
    const indice = this.bddPaciente.findIndex(
        (paciente)=>{
          return paciente.id === id
        }
    );
    this.bddPaciente.splice(indice,1);
    return this.bddPaciente;
  }

  eliminarMedicamento(id:number):Medicamento[]{
    const indice = this.bddMedicamento.findIndex(
        (medicamento)=>{
          return medicamento.id === id
        }
    );
    this.bddMedicamento.splice(indice,1);
    return this.bddMedicamento;
  }

  buscarMedicamento(arreglo:Medicamento,parametro){
    if(arreglo.nombre==parametro){
      this.bddBusquedaM.push(arreglo);
    }
  }

  buscarPaciente(arreglo:Paciente,parametro){
    if(arreglo.nombres==parametro||arreglo.apellidos==parametro){
      this.bddBusquedaP.push(arreglo);
    }
  }
}
