import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";
//ws://localhost:3001/websockets
@WebSocketGateway(3006,{
    namespace:'/websockets'
})
export class SocketGateway {
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);
    }
    /*@SubscribeMessage('holaMundo')
    holaMundo(client:Client | any, data: any){
        console.log(data);
        console.log('Nos hacen la peticion');
        console.log(this.server);
        client.broadcast.emit('saludaron',data);
        return 'Hola '+ data.nombre;
    }*/
    @SubscribeMessage('despachar')
    async despachar(client: Client | any, data: any) {
        let pedido = {
            id: Number(data.id),
            nombre: 'Carlos',
            direccion: 'Nayon',
            telefono: '0958648759',
            cedula: '1724589568',
            estado: 'DESPACHADO',
            subtotal: 0,
            total: 0
        };
        client.broadcast.emit('pedido', {pedido})
        return pedido
    }

    @SubscribeMessage('pedidos')
    pedidos(client:Client | any, data: any){
        console.log(data);
        console.log('Nos hacen la peticion');
        console.log(this.server);
        client.broadcast.emit('saludaron',data);
        return 'Hola '+ data.nombre;
    }
}