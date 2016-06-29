import { InjectConstructor, register } from '../ng';
import { Dependencies, OnInit } from '../common';


export function Config(dependencies?: Dependencies) {
  return function(target: InjectConstructor<OnInit>): void {
    register(target, { dependencies })
      .config(($injector: ng.auto.IInjectorService) => {
        $injector.invoke(target).$onInit();
      });
  };
}
