import 'reflect-metadata';

export function injectable() {
  return <T extends { new (...args: any[]): object }>(constructor: T) => {
    return constructor;
  };
}
