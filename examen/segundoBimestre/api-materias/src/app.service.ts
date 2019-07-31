import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {estudianteEntity} from "./entity/estudiante.entity";
import {materiaEntity} from "./entity/materia.entity";
import {Materias} from "./interfaces/materias";
import {usuarioEntity} from "./entity/usuario.entity";



@Injectable()
export class AppService {
    idpadre=0;
    idUsuario=0;
    bddBusquedaM:materiaEntity[]=[];

  constructor(@InjectRepository(estudianteEntity)
               private readonly _estudianteRepository: Repository<estudianteEntity>,
              @InjectRepository(materiaEntity)
              private readonly _materiaRepository: Repository<materiaEntity>,
              @InjectRepository(usuarioEntity)
              private readonly _usuarioRepository: Repository<usuarioEntity>,){
  }

  crearMateria(nuevaMateria:Materias): Promise<materiaEntity>{

        // @ts-ignore
      const objetoEntidad = this._materiaRepository.create(nuevaMateria);
      return this._materiaRepository.save(objetoEntidad); //promesa
  }

  buscarUsuario(parametrosBusqueda?):Promise<usuarioEntity[]>{
      return this._usuarioRepository.find(parametrosBusqueda);
  }

  buscarEstudiante(parametrosBusqueda?):Promise<estudianteEntity[]>{
    return this._estudianteRepository.find(parametrosBusqueda);
  }

  buscarMateria(parametrosBusqueda?):Promise<materiaEntity[]>{
    return this._materiaRepository.find(parametrosBusqueda);
  }

    async eliminarMateriaPorId(id: number):Promise<materiaEntity>{
        let objetoEntidad =await this._materiaRepository.findOne(id);
        return this._materiaRepository.remove(objetoEntidad);
        // const indice = this.bddTragos.findIndex(
        //     (trago)=>{
        //         return trago.id === id
        //     }
        // );
        // this.bddTragos.splice(indice,1);
        // return this.bddTragos;
    }
}
