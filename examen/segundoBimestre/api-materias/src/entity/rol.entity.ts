import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {usuarioEntity} from "./usuario.entity";

@Entity('rol') // Nombre tabla
export class rolEntity {

    @PrimaryGeneratedColumn()
    idRol:number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'tipo_rol',
    })
    tipoRol: string;

    @OneToMany(type => usuarioEntity, usuario => usuario.rolId)
    usuarios: usuarioEntity[];
}