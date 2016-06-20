import { toCamel } from './case';

export * from './common';

export {
  Dependencies,
  BaseConfig,
  InjectFn,
  InjectConstructor,
  register
};


const NAME_PROP = 'ng-esm:name';


type Dependencies = (string | Function)[];

interface BaseConfig {
  name?: string;
  dependencies?: Dependencies;
}

interface InjectFn {
  (...injectables: any[]): void;
}

interface InjectConstructor<T> {
  new (...injectables: any[]): T;
}


function generateId() {
  return `ng-esm:id-${Math.random()}`;
}

function name(target: Function, { name = target.name }: BaseConfig) {
  if (!name) {
    throw new Error(`Must provide named class or 'name' property in config`);
  }

  return toCamel(name);
}

function dependencies({ dependencies = [] }: BaseConfig): string[] {
  return dependencies.map(d => typeof d === 'string' ? d : d[NAME_PROP]);
}

function register(
  target: Function, config: BaseConfig = {}, nameAsId: boolean = false
) {
  let id = nameAsId ? name(target, config) : generateId(),
      m = angular.module(id, dependencies(config));

  console.log(`Declaring module ${id}: `, dependencies(config), target);
  Reflect.defineProperty(target, NAME_PROP, { value: id });

  // TODO?: constant, decorator, directive, factory, value

  return {
    component(componentConfig: angular.IComponentOptions) {
      console.log('Registering component: ', name(target, config));
      m.component(name(target, config), componentConfig);
    },
    config(configFn: InjectFn) {
      console.log('Creating config');
      m.config(configFn);
    },
    filter(filterFactory: Function) {
      console.log('Registering filter: ', name(target, config));
      m.filter(name(target, config), filterFactory);
    },
    run(runFn: InjectFn) {
      console.log('Creating run');
      m.run(runFn);
    },
    service(serviceConstructor: Function) {
      console.log('Registering service: ', name(target, config));
      m.service(name(target, config), serviceConstructor);
    }
  };
}
