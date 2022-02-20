import { Command, Console } from 'nestjs-console';
import { Preset } from '../../modules/presets/preset';

@Console({
  command: 'publish',
  description: 'Test command for publish',
})
export class AppService {
  constructor(protected preset: Preset) {}
  @Command({
    command: 'test',
    description: 'Only one command for testing',
  })
  async publish() {
    await this.preset.publish();
  }
}
