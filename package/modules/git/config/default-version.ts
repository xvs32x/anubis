export const DefaultVersionToken = 'DefaultVersionToken';

export const DefaultVersionFactory = {
  provide: DefaultVersionToken,
  useFactory: () => {
    return '0.0.0';
  },
};
