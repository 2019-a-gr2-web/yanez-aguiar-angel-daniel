import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { EstudianteEntity } from "../Padre/padre.entity";
import { DetalleEntity } from "../Detalle/detalle.entity";

@Entity('Materia')
export class MateriaEntity{
    @PrimaryGeneratedColumn()
    materiaId:number;

    @Column({
        length:100,
    })
    nombre:string;

    @Column({
        length:100,
    })
    codigo:string;

    @Column({
        length:100,
    })
    descripcion: string;

    @Column({
        default:true,
    })
    activo: boolean;

    @Column({
        default:'2019-07-30',
    })
    fechaCreacion:Date;

    @Column({
        default: 1,
    })
    numeroHorasPorSemana: number;

    @ManyToOne(
        type => EstudianteEntity,
        tienda=> tienda.productos
        )
        TiendaId:EstudianteEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle=> detalle.prodcutoId
        )
        detalles:DetalleEntity[];
    
    
}