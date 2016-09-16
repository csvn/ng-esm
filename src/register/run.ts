import ng from 'angular';
import { InjectConstructor, createModule } from '../ng';
import { Dependencies, OnInit } from '../common';


export function Run(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    function runRunner($injector: ng.auto.IInjectorService): void {
      $injector.instantiate<OnInit>(target).$onInit();
    }
    runRunner.$inject = ['$injector'];

    createModule(target, dependencies)
      .run(runRunner);
  };
}
