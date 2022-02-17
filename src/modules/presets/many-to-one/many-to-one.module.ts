import { Module } from '@nestjs/common';
import { ManyToOneService } from './many-to-one.service';
import { LoggerModule } from '../../logger/logger.module';
import { GitModule } from '../../git/git.module';
import { Preset } from '../preset';
import { ConfigModule } from '../../config/config.module';

@Module({
  providers: [
    {
      provide: Preset,
      useClass: ManyToOneService,
    },
  ],
  exports: [Preset],
  imports: [LoggerModule, GitModule, ConfigModule],
})
export class ManyToOneModule {}
