export const TagPattern = 'TagPatternToken';

export const TagPatternProvider = {
  provide: TagPattern,
  useValue: '([0-9]+).([0-9]+).([0-9]+)',
};
