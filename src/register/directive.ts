import ng from 'angular';
import { toCamel } from '../case';
import { config, name, createModule } from '../ng';
import { BaseConfig } from '../common';


/** Used for `@Directive()` decorator. Extended version of settings for `ng.module().directive()` */
export interface DirectiveOptions extends BaseConfig, ng.IDirective {}

/**
 * Decorate a class (controller) as a angular directive. This only makes sense to use if
 * the directive should use a controller. If DI for compile or link functions is required
 * it is better to just use the method `ngModule()` to create an angular module
 */
export function Directive(options: DirectiveOptions) {
  return function(target: Function): void {
    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    createModule(target, options.dependencies)
      .directive(toCamel(name(target, options)), () => options);
  };
}
