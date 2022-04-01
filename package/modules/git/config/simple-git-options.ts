import { SimpleGitOptions } from 'simple-git/src/lib/types';

export const SimpleGitOptionsToken = 'SimpleGitOptions';

export const SimpleGitOptionsFactory = {
  provide: SimpleGitOptionsToken,
  useFactory: (): Partial<SimpleGitOptions> => {
    return {
      baseDir: process.cwd(),
    };
  },
};
