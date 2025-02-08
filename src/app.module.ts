import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversalSocketModule } from './system/universal-socket/universal-socket.module';

@Module({
  imports: [UniversalSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
