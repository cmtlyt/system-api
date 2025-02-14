import type { TObject } from '@cmtlyt/base';

export interface MessageOperation {
  sendSelfId?: boolean;
  onlySendTarget?: string;
  customMetadata?: TObject<any>;
}

export interface BasePayload {
  roomId: string;
  userId: string;
  operation?: MessageOperation;
}

export interface RoomPayload extends BasePayload {
  data?: TObject<any>;
}

export interface MessagePayload extends BasePayload {
  data: TObject<any>;
}
