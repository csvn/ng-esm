import * as ng from 'angular';
import { toCamel } from '../common/case';
import { config, name, createModule } from '../common/ng';
import { BaseConfig } from '../common/interface';


/** Used for `@Directive()` decorator. Extended version of settings for `ng.module().directive()` */
export interface DirectiveOptions extends BaseConfig, ng.IDirective {}

/**
 * Decorate a class (controller) as a AngularJS directive. This only makes sense to use if
 * the directive should use a controller. If DI for compile or link functions is required
 * it is better to just use the method `ngModule()` to create an AngularJS module
 */
export function Directive(options: DirectiveOptions) {
  return function(target: Function): void {
    options.controller = <any> target;
    options.controllerAs = options.controllerAs || config.ctrlAs;

    createModule(target, options.dependencies)
      .directive(toCamel(name(target, options)), () => options);
  };
}
