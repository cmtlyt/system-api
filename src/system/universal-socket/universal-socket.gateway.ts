import { Inject } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinRoomPayload, MessagePayload } from './types';
import { UniversalSocketService } from './universal-socket.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class UniversalSocketGateway {
  constructor() {}

  @WebSocketServer()
  private server: Server;

  @Inject()
  private universalSocketService: UniversalSocketService;

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, payload: JoinRoomPayload) {
    const roomId = await this.universalSocketService.joinRoom(client, payload);

    this.server.to(roomId).emit('joinRoom', {
      userId: payload.userId,
    });
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, payload: JoinRoomPayload) {
    const roomId = await this.universalSocketService.leaveRoom(client, payload);

    this.server.to(roomId).emit('leaveRoom', {
      userId: payload.userId,
    });
  }

  @SubscribeMessage('broadcast')
  broadcast(@MessageBody() payload: MessagePayload) {
    const roomId = payload.roomId.toString();

    this.server.to(roomId).emit('broadcast', {
      userId: payload.userId,
      data: payload.data,
    });
  }
}
