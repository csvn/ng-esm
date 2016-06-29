import { register } from '../ng';
import { ComponentOptions } from '../common';


export function Component(options: ComponentOptions) {
  return function(target: Function): void {
    options.controller = target;

    register(target, options).component(options);
  };
}
