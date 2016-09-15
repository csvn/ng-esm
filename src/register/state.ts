import { StateProvider } from 'angular-ui-router';
import { config, createModule } from '../ng';
import { StateOptions } from '../common';
import { RESOLVES_SYMBOL } from './resolve';

const UI_ROUTER = 'ui.router';

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
    options.dependencies.push(UI_ROUTER);

    createModule(target, options.dependencies)
      .config(stateRunner);
  };
}
