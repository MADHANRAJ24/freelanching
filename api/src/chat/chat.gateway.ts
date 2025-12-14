import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
// import { WsJwtGuard } from '../auth/ws-jwt.guard'; // Would need custom guard for WS

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() payload: { conversationId: number, content: string, senderId: number }) {
        // In real app: validate user via token, save to DB
        // this.chatService.saveMessage(payload);

        // Broadcast to conversation room
        this.server.to(`conversation-${payload.conversationId}`).emit('newMessage', payload);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        client.join(room);
        client.emit('joinedRoom', room);
    }
}
