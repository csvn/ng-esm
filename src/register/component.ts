import * as ng from 'angular';
import { toCamel } from '../common/case';
import { config, name, createModule } from '../common/ng';
import { BaseConfig } from '../common/interface';


const NAME_SYMBOL = Symbol('componentName');

/** Used for `@Component()` decorator. Extended version of settings for `ng.module().component()` */
export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {}

/** Decorate a class (controller) as an angular component */
export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    const componentName = toCamel(name(target, options));

    options.controller = <any> target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    Reflect.defineProperty(target, NAME_SYMBOL, { value: componentName });

    createModule(target, options.dependencies)
      .component(componentName, options);
  };
}

/** Get the `name` of a @Component decorated class/function */
export function componentName(target: Function): string | undefined {
  return Reflect.get(target, NAME_SYMBOL);
}
