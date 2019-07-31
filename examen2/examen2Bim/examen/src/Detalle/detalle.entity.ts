import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { MateriaEntity } from "../Hijo/hijo.entity";
import { PedidoEntity } from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

  /*  @Column({
        default: 1,
    })
    cantidad:number;
*/
    @ManyToOne(
        type => MateriaEntity,
        producto=> producto.detalles
        )
        prodcutoId:MateriaEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}