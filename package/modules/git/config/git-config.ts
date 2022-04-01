export interface GitConfig {
  [field: string]: string;
}

export const GitConfigToken = 'GitConfig';

export const GitConfigFactory = {
  provide: GitConfigToken,
  useFactory: (): GitConfig => {
    return {};
  },
};
