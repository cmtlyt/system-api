import { TObject } from '@cmtlyt/base';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { BasePayload, RoomPayload } from './universal-socket.types';

@Injectable()
export class UniversalSocketService {
  /** 加入房间 */
  async joinRoom(client: Socket, payload: RoomPayload) {
    const roomId = String(payload.roomId);

    await client.join(roomId);

    return roomId;
  }

  /** 离开房间 */
  async leaveRoom(client: Socket, payload: RoomPayload) {
    const roomId = String(payload.roomId);

    await client.leave(roomId);

    return roomId;
  }

  /** 房间内客户端总数 */
  clientTotalOfRoom(server: Server, roomId: string) {
    return server.sockets.adapter.rooms.get(roomId)?.size || 0;
  }

  getMetadata(server: Server, roomId: string, payload?: BasePayload, client?: Socket) {
    const metadata: TObject<any> = {
      clientTotal: this.clientTotalOfRoom(server, roomId),
      ...(payload?.operation?.customMetadata || {}),
    };

    const { sendSelfId } = payload?.operation || {};

    if (sendSelfId && client) {
      metadata.from = client.id;
    }

    return metadata;
  }

  generateReceverdPayload(server: Server, roomId: string, payload: BasePayload & TObject<any>, client: Socket) {
    return {
      roomId,
      userId: payload.userId,
      metadata: this.getMetadata(server, roomId, payload, client),
      data: payload.data,
      sign: payload.sign,
    };
  }
}
