export const TagPatternToken = 'TagPattern';

export const TagPatternFactory = {
  provide: TagPatternToken,
  useFactory: (): string => {
    // return '^([a-z]+)-([0-9.]+)';
    return '([0-9]+).([0-9]+).([0-9]+)';
  },
};
