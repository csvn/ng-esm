import ng from 'angular';
import { toCamel } from '../case';
import { config, name, createModule } from '../ng';
import { BaseConfig } from '../common';


const NAME_SYMBOL = Symbol('componentName');

/** Used for `@Component()` decorator. Extended version of settings for `ng.module().component()` */
export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {}

/** Decorate a class (controller) as an angular component */
export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    const COMP_NAME = toCamel(name(target, options));

    options.controller = <any> target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    Reflect.defineProperty(target, NAME_SYMBOL, { value: COMP_NAME });

    createModule(target, options.dependencies)
      .component(COMP_NAME, options);
  };
}

/** (internal) Get the component name from a `Function` decorated with @Component() */
export function componentName(component: Function) {
  return component ? (<any> component)[NAME_SYMBOL] : null;
}
