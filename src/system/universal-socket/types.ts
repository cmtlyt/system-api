import type { TObject } from '@cmtlyt/base';

export interface JoinRoomPayload {
  roomId: string;
  userId: string;
}

export interface MessagePayload {
  roomId: string;
  userId: string;
  data: TObject<any>;
}
