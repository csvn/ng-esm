import { register } from '../ng';
import { StateOptions } from '../common';


export function State(options: StateOptions) {
  return function(target: Function): void {
    function stateRunner($stateProvider: ng.ui.IStateProvider): void {
      options.controller = target;
      $stateProvider.state(options);
      console.log(options);
    }

    stateRunner.$inject = ['$stateProvider'];
    register(target, options).config(stateRunner);
  };
}
