import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const DefaultVersion = 'DefaultVersionToken';

export const DefaultVersionProvider: Provider = {
  provide: DefaultVersion,
  useValue: '0.0.0',
};
