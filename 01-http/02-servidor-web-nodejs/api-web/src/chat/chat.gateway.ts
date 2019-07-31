import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from "@nestjs/websockets";
import {Client,Server} from "socket.io";
//ws://localhost:3001/websockets
@WebSocketGateway(3001,{namespace:'/websockets'})
export class ChatGateway {
    @WebSocketServer() server:Server;
    /*constructor(){
        console.log(this.server);
    }*/
    @SubscribeMessage('holaMundo')
    holaMundo(client:Client | any, data: any){
        const event = 'saludaron';
        return { event, data };
    }
}