import { Command, Console } from 'nestjs-console';
import { GitPreset } from '../../modules/presets/git-preset';

@Console({
  command: 'publish',
  description: 'Test command for publish',
})
export class AppService {
  constructor(protected preset: GitPreset) {}
  @Command({
    command: 'test',
    description: 'Only one command for testing',
  })
  async publish() {
    await this.preset.publish();
  }
}
