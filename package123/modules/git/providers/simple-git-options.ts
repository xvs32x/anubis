export const SimpleGitOptions = 'SimpleGitOptionsToken';

export const SimpleGitOptionsProvider = {
  provide: SimpleGitOptions,
  useValue: {
    baseDir: process.cwd(),
  },
};
