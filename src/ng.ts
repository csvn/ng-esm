import { toCamel } from './case';
import { BaseConfig, ComponentOptions } from './common';

export {
  BaseConfig,
  InjectFn,
  InjectConstructor,
  register
};

const ID_SYMBOL = Symbol('moduleId');


interface InjectFn {
  (...injectables: any[]): void;
}

interface InjectConstructor<T> {
  new (...injectables: any[]): T;
}


function name(target: Function, { name = target.name }: BaseConfig) {
  if (!name) {
    throw new Error(`Must provide named class, or 'name' property in config`);
  }

  return toCamel(name);
}

function generateId() {
  return `ng-esm:${Math.random()}`;
}

function moduleId({ [ID_SYMBOL]: moduleId }): string {
  if (!moduleId) {
    throw new Error(`Function missing property Symbol('moduleId'). ` +
      `Make sure all function dependencies are decorated by ng-esm`);
  }

  return moduleId;
}

function dependencies({ dependencies = [] }: BaseConfig): string[] {
  return dependencies.map(d => typeof d === 'string' ? d : moduleId(d));
}

function register(
  target: Function, config: BaseConfig = {}, nameAsId: boolean = false
) {
  let id = nameAsId ? name(target, config) : generateId(),
      m = angular.module(id, dependencies(config));

  console.log(`## Declaring module ${id}: `, dependencies(config));
  Reflect.defineProperty(target, ID_SYMBOL, { value: id });

  // TODO: constant, decorator, directive, factory, value, controller?

  return {
    component(componentConfig: ComponentOptions) {
      console.log('## Registering component: ', name(target, config));
      m.component(name(target, config), componentConfig);
    },
    config(configFn: InjectFn) {
      console.log('## Creating config');
      m.config(configFn);
    },
    filter(filterFactory: Function) {
      console.log('## Registering filter: ', name(target, config));
      m.filter(name(target, config), filterFactory);
    },
    run(runFn: InjectFn) {
      console.log('## Creating run');
      m.run(runFn);
    },
    service(serviceConstructor: Function) {
      console.log('## Registering service: ', name(target, config));
      m.service(name(target, config), serviceConstructor);
    }
  };
}
