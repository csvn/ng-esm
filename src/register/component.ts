import { toCamel } from '../case';
import { config, name, createModule } from '../ng';
import { ComponentOptions } from '../common';


export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    createModule(target, options.dependencies)
      .component(toCamel(name(target, options)), options);
  };
}
