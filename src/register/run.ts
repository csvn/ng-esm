import * as ng from 'angular';
import { InjectConstructor, createModule } from '../ng';
import { Dependencies, OnInit } from '../common';


/** Decorate a class for `ng.module().run()`. The class must implement `OnInit` interface */
export function Run(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    function runRunner($injector: ng.auto.IInjectorService): void {
      let instance = $injector.instantiate<OnInit>(target);

      if (instance.$onInit) {
        instance.$onInit();
      }
    }
    runRunner.$inject = ['$injector'];

    createModule(target, dependencies)
      .run(runRunner);
  };
}
