import { CreateCommandOptions } from 'nestjs-console/dist/decorators';
import { Command } from 'nestjs-console';

export const Step = (options: CreateCommandOptions): MethodDecorator =>
  Command(options);
