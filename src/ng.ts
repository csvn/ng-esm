import { toCamel } from './case';

export {
  BaseConfig,
  register
};


const NAME_PROP = 'ng-esm:name';


interface BaseConfig {
  name?: string;
  dependencies?: (string | Function)[];
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

  return {
    component(componentConfig: angular.IComponentOptions) {
      console.log('Registering component: ', name(target, config));
      m.component(name(target, config), componentConfig);
    },
    filter(filterFactory: Function) {
      console.log('Registering filter: ', name(target, config));
      m.filter(name(target, config), filterFactory);
    }
  };
}
