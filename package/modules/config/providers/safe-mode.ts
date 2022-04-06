import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const SafeMode = 'SafeModeToken';

export const SafeModeProvider: Provider = {
  provide: SafeMode,
  useValue: false,
};
