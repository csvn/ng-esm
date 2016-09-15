import { toCamel } from '../case';
import { config, name, createModule } from '../ng';
import { DirectiveOptions } from '../common';


export function Directive(options: DirectiveOptions) {
  return function(target: Function): void {
    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    createModule(target, options.dependencies)
      .directive(toCamel(name(target, options)), () => options);
  };
}
