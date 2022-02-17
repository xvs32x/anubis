export const SafeModeToken = 'SafeMode';

export const SafeModeFactory = {
  provide: SafeModeToken,
  useFactory: () => {
    return true;
  },
};
