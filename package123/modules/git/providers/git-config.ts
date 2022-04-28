import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const GitConfig = 'GitConfigToken';

export const GitConfigProvider: Provider = {
  provide: GitConfig,
  useValue: {},
};
