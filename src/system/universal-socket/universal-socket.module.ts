import { Module } from '@nestjs/common';
import { UniversalSocketGateway } from './universal-socket.gateway';
import { UniversalSocketService } from './universal-socket.service';

@Module({
  providers: [UniversalSocketGateway, UniversalSocketService],
})
export class UniversalSocketModule {}
