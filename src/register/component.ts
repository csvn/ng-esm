import ng from 'angular';
import { toCamel } from '../case';
import { config, name, createModule } from '../ng';
import { BaseConfig } from '../common';


/** Used for `@Component()` decorator. Extended version of settings for `ng.module().component()` */
export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {}

/** Decorate a class (controller) as an angular component */
export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    createModule(target, options.dependencies)
      .component(toCamel(name(target, options)), options);
  };
}
