import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JoinRoomPayload } from './types';

@Injectable()
export class UniversalSocketService {
  /** 加入房间 */
  async joinRoom(client: Socket, payload: JoinRoomPayload) {
    const roomId = payload.roomId.toString();

    await client.join(roomId);

    return roomId;
  }

  /** 离开房间 */
  async leaveRoom(client: Socket, payload: JoinRoomPayload) {
    const roomId = payload.roomId.toString();

    await client.leave(roomId);

    return roomId;
  }
}
