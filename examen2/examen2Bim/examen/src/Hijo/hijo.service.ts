import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MateriaEntity } from "./hijo.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductosService {
    recnum = 1;
    constructor(@InjectRepository(MateriaEntity)
    private readonly _productoRepository: Repository<MateriaEntity>, ) {
    }

    listaProductos(id): Promise<MateriaEntity[]> {
        return this._productoRepository.find({
            where: { productoId: id }
        });
    }

    crear(nuevoProducto: MateriaEntity):Promise<MateriaEntity>{
        const objetoEntidad = this._productoRepository.create(nuevoProducto);
        return this._productoRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{
        return this._productoRepository.delete({
            materiaId:id
        });
    }
    async editar(ProductoModificado:MateriaEntity):Promise<Object>{
        
        const ProductoActual = await this._productoRepository.findOne(ProductoModificado.materiaId);
        console.log("Producto Actual: ", ProductoActual);
        console.log("Producto Nuevo: ", ProductoModificado);
        ProductoModificado.materiaId = ProductoActual.materiaId;
        return this._productoRepository.save(ProductoModificado);

    }

    buscar(parametrosBusquedaNombre?,fechaBusqueda?):Promise<MateriaEntity[]>{
        if(parametrosBusquedaNombre!=""&&fechaBusqueda!=""){
            return this._productoRepository.find({
                nombre:parametrosBusquedaNombre,
                codigo:fechaBusqueda
            });
        }else{
            if(parametrosBusquedaNombre==""&& fechaBusqueda !=""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else if(parametrosBusquedaNombre!="" && fechaBusqueda==""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else{
                return this._productoRepository.find();
            }
        }
    }
    buscarXid(id?:number):Promise<MateriaEntity[]>{
        return this._productoRepository.find({
            materiaId:id
        });
    }

    listarTodo():Promise<MateriaEntity[]>{
        return this._productoRepository.find();
    }
}