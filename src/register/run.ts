import { InjectConstructor, register } from '../ng';
import { Dependencies, OnInit } from '../common';


export function Run(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    function runRunner($injector: ng.auto.IInjectorService): void {
      $injector.invoke(target).$onInit();
    }

    runRunner.$inject = ['$injector'];
    register(target, { dependencies }).run(runRunner);
  };
}
