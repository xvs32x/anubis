import { Dependencies } from './secondary/dependencies';
import { Dependency } from './secondary/dependency';
import { Injection } from './injection';

export class Container {
  static #instances: { [k: string]: Injection<any> } = {};

  static get<T>(Constructor: Dependency<T>): T {
    if (!Container.#instances[Constructor.name]) {
      Container.set<T>(Constructor);
    }
    return Container.#instances[Constructor.name].instance;
  }

  static set<T>(Constructor: Dependency<T>): void {
    Container.#instances[Constructor.name] = new Injection<T>(
      Container.#createInstance(Constructor),
      Constructor,
    );
  }

  static #createInstance<T>(Constructor: Dependency<T>): T {
    const dependencies = [];
    (Container.#getDependencies<T>(Constructor) || []).forEach((Dependency) => {
      dependencies.push(Container.get(Dependency));
    });
    return new Constructor(...dependencies);
  }

  static #getDependencies<T>(Constructor: Dependency<T>): Dependencies {
    return Reflect.getMetadata('design:paramtypes', Constructor);
  }
}
