export class Injection<T> {
  constructor(public instance: T, public construct: new (args?: any) => T) {}
}
