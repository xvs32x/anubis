export const SafeModeToken = 'SafeModeToken';

export const SafeModeFactory = {
  provide: SafeModeToken,
  useFactory: () => {
    return false;
  },
};
