import { Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UniversalSocketService } from './universal-socket.service';
import { MessagePayload, RoomPayload } from './universal-socket.types';

@WebSocketGateway({ cors: { origin: '*' } })
export class UniversalSocketGateway {
  constructor() {}

  @WebSocketServer()
  private server: Server;

  @Inject()
  private universalSocketService: UniversalSocketService;

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, payload: RoomPayload) {
    const roomId = await this.universalSocketService.joinRoom(client, payload);

    this.server.to(roomId).emit('joinRoom', {
      userId: payload.userId,
      roomId,
      metadata: this.universalSocketService.getMetadata(this.server, roomId, payload, client),
      data: payload.data,
      sign: payload.sign,
    });
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, payload: RoomPayload) {
    const roomId = await this.universalSocketService.leaveRoom(client, payload);

    this.server.to(roomId)
      .emit('leaveRoom', this.universalSocketService.generateReceverdPayload(this.server, roomId, payload, client));
  }

  @SubscribeMessage('getSelfId')
  getSelfId(client: Socket) {
    client.emit('getSelfId', { data: { selfId: client.id } });
  }

  @SubscribeMessage('broadcast')
  broadcast(client: Socket, payload: MessagePayload) {
    const roomId = String(payload.roomId || 'global');
    const { onlySendTarget } = payload.operation || {};

    if (onlySendTarget) {
      this.server.to(onlySendTarget)
        .emit('broadcast', this.universalSocketService.generateReceverdPayload(this.server, roomId, payload, client));
      return;
    }

    this.server.to(roomId)
      .emit('broadcast', this.universalSocketService.generateReceverdPayload(this.server, roomId, payload, client));
  }
}
