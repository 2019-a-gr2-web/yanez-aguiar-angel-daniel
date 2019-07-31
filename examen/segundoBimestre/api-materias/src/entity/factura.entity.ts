import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {usuarioEntity} from "./usuario.entity";
import {detalleEntity} from "./detalle.entity";

@Entity('factura') // Nombre tabla
export class facturaEntity {

    @PrimaryGeneratedColumn()
    idFactura:number;

    @ManyToOne(type => usuarioEntity, usuario => usuario.facturas)
    usuarioId: usuarioEntity;

    @OneToMany(type => detalleEntity, detalle => detalle.facturaId)
    detalles: detalleEntity[];
}