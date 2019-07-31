import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EstudianteEntity} from "./padre.entity";
import { Repository } from "typeorm";

@Injectable()
export class TiendaService {
    constructor(@InjectRepository(EstudianteEntity)
    private readonly _tiendaRepository: Repository<EstudianteEntity>) {
    }
    findAll():Promise<EstudianteEntity[]>{
        return this._tiendaRepository.find();
    }
}