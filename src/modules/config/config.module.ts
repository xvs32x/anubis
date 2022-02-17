import { Module } from '@nestjs/common';
import { SafeModeFactory } from './safe-mode';

@Module({
  providers: [SafeModeFactory],
  exports: [SafeModeFactory],
})
export class ConfigModule {}
