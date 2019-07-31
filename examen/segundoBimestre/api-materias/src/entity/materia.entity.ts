import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {estudianteEntity} from "./estudiante.entity";

@Entity('materia') // Nombre tabla
export class materiaEntity {

    @PrimaryGeneratedColumn()
    idMateria:number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'codigo',
    })
    codigo: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'descripcion',
    })
    descripcion: string;

    @Column({
        type: 'boolean',
        name: 'activo',
    })
    activo: boolean;

    @Column({
        type: 'date',
        default: '2019-06-19',
        name: 'fechaCreacion',
    })
    fechaCreacion: Date;

    @Column({
        type: 'int',
        name: 'numeroHorasPorSemana',
    })
    numeroHorasPorSemana: number;

    @Column({
        type: 'float',
        name: 'precio',
    })
    precio: number;

    @ManyToOne(type => estudianteEntity, estudiante => estudiante.materias)
    estudianteId: estudianteEntity;

}