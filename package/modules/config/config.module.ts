import { Module } from '@nestjs/common';
import { SafeModeProvider } from './providers/safe-mode';

@Module({
  providers: [SafeModeProvider],
  exports: [SafeModeProvider],
})
export class ConfigModule {}
