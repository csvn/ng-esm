import { InjectConstructor, register } from '../ng';
import { Dependencies, OnInit } from '../common';


export function Config(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    function configRunner($injector: ng.auto.IInjectorService): void {
      $injector.invoke(target).$onInit();
    }

    configRunner.$inject = ['$injector'];
    register(target, { dependencies }).config(configRunner);
  };
}
