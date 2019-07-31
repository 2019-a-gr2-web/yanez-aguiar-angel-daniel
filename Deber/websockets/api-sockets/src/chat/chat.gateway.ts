import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";

//ws://localhost:3001/websockets
@WebSocketGateway(3001, { namespace: '/websockets' })
export class ChatGateway {
    @WebSocketServer() server;
    @SubscribeMessage('holaMundo')
    HolaMundo(cliente: Client | any, data: any) {
        console.log(data);
        console.log('Nos hacen la peticion');
        console.log(this.server);
        cliente.broadcast.emit('saludaron', data);
        return 'Hola ' +data.id+data.name;
    }
    constructor() {
        console.log(this.server);
    }
}