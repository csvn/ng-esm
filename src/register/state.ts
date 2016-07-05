import { config, register } from '../ng';
import { StateOptions } from '../common';
import { RESOLVES_SYMBOL } from './resolve';


export function State(options: StateOptions) {
  return function(target: Function | any): void {
    function stateRunner($stateProvider: ng.ui.IStateProvider): void {
      options.controller = target;
      options.controllerAs = options.controllerAs || config.ctrlAs;

      if (target[RESOLVES_SYMBOL]) {
        options.resolve = target[RESOLVES_SYMBOL];
      }

      $stateProvider.state(options);
      console.log(options);
    }

    stateRunner.$inject = ['$stateProvider'];
    register(target, options).config(stateRunner);
  };
}
