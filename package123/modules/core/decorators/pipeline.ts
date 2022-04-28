import { CreateCommandOptions } from 'nestjs-console/dist/decorators';
import { Console } from 'nestjs-console';

export const Pipeline = (
  options?: CreateCommandOptions | undefined,
): ClassDecorator => Console(options);
