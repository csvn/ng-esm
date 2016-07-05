import { config, register } from '../ng';
import { ComponentOptions } from '../common';


export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    register(target, options).component(options);
  };
}
