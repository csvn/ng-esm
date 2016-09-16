import ng from 'angular';
import { InjectConstructor, createModule } from '../ng';
import { Dependencies, OnInit } from '../common';


/** Decorate a class for `ng.module().config()`. The class must implement `OnInit` interface */
export function Config(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    function configRunner($injector: ng.auto.IInjectorService): void {
      $injector.instantiate<OnInit>(target).$onInit();
    }
    configRunner.$inject = ['$injector'];

    createModule(target, dependencies)
      .config(configRunner);
  };
}
