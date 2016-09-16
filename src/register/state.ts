import { StateProvider, Ng1StateDeclaration } from 'angular-ui-router';
import { config, createModule } from '../ng';
import { BaseConfig } from '../common';
import { RESOLVES_SYMBOL } from './resolve';

const UI_ROUTER = 'ui.router';

/**
 * UI-router state declaration. [More information on the docs](
 * https://ui-router.github.io/docs/latest/interfaces/ng1.ng1statedeclaration.html)
 */
export interface StateOptions extends BaseConfig, Ng1StateDeclaration {
  /** The ui-router state name */
  name: string;
}

/** Decorate a class (controller) as a new state. TODO: support for simultaneous `@Component()` */
export function State(options: StateOptions) {
  return function(target: Function | any): void {
    function stateRunner($stateProvider: StateProvider): void {
      if (target[RESOLVES_SYMBOL]) {
        options.resolve = target[RESOLVES_SYMBOL];
      }

      $stateProvider.state(options.name, options);
    }
    stateRunner.$inject = ['$stateProvider'];

    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;
    options.dependencies = options.dependencies || [];
    if (options.dependencies.indexOf(UI_ROUTER) < 0) {
      options.dependencies.push(UI_ROUTER);
    }

    createModule(target, options.dependencies)
      .config(stateRunner);
  };
}
